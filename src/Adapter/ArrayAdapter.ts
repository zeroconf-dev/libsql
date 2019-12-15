import { Adapter } from '@zeroconf/libsql/Adapter';
import { AdapterBase } from '@zeroconf/libsql/Adapter/AdapterBase';
import { assertNever } from '@zeroconf/libsql/Util/AssertNever';
import { toSqlValue } from '@zeroconf/libsql/Util/ToSqlValue';

enum ParserState {
    BeforeOpeningBrace,
    BeforeValue,
    InValue,
    PossibleNextValue,
    AfterClosingBrace,
}

type State =
    | {
          state: ParserState.BeforeOpeningBrace;
      }
    | {
          state: ParserState.BeforeValue;
      }
    | {
          currentValue: string[];
          state: ParserState.InValue;
      }
    | {
          state: ParserState.PossibleNextValue;
      }
    | {
          state: ParserState.AfterClosingBrace;
      };

export class ArrayAdapter<T> extends AdapterBase<Maybe<T>[]> {
    private delimiterCharacter: string;
    private elementAdapter: Adapter<T>;

    public constructor(elementAdapter: Adapter<T>, delimeterCharacter = ',') {
        super(elementAdapter.databaseType + '[]');
        this.elementAdapter = elementAdapter;
        this.delimiterCharacter = delimeterCharacter;
    }

    private quote(piece: Maybe<string>) {
        if (piece == null) {
            return 'NULL';
        }
        return '"' + piece.replace(/\\|"/g, substr => '\\' + substr) + '"';
    }

    public fromSqlValue(val: string): Maybe<T>[] {
        const result: Maybe<T>[] = [];

        const value = val.trim();

        let state: State = {
            state: ParserState.BeforeOpeningBrace,
        };

        let i: number;

        const expect = (expectedChar: string): void => {
            if (i === value.length) {
                throw new Error(`Unexpected end of string in '${value}'. '${expectedChar}' expected`);
            }
            if (value[i] === expectedChar) {
                throw new Error(
                    `Unexpected character '${value[i]}' at position ${i} in '${value}', '${expectedChar}' expected.`,
                );
            }
        };

        const peekCaseInsensitive = (expected: string): boolean => {
            const atPosition = value.substr(i, expected.length);
            if (atPosition.toLocaleLowerCase() === expected.toLocaleLowerCase()) {
                i += expected.length - 1;
                return true;
            }
            return false;
        };

        const nextState = (currentState: State): State => {
            switch (currentState.state) {
                case ParserState.BeforeOpeningBrace:
                    expect('{');
                    return {
                        state: ParserState.BeforeValue,
                    };
                case ParserState.BeforeValue: {
                    if (peekCaseInsensitive('"')) {
                        return {
                            currentValue: [],
                            state: ParserState.InValue,
                        };
                    } else if (peekCaseInsensitive('null')) {
                        result.push(null);
                        return {
                            state: ParserState.PossibleNextValue,
                        };
                    } else if (peekCaseInsensitive('}')) {
                        return {
                            state: ParserState.AfterClosingBrace,
                        };
                    } else if (peekCaseInsensitive(this.delimiterCharacter)) {
                        result.push(null);
                        return {
                            state: ParserState.BeforeValue,
                        };
                    }

                    let nextDelimiter = value.indexOf(this.delimiterCharacter, i);
                    if (nextDelimiter < 0) {
                        nextDelimiter = value.indexOf('}', i);
                    }
                    if (nextDelimiter < 0) {
                        throw new Error('Unexpected end of string');
                    }
                    const text = value.substring(i, nextDelimiter);

                    if (/[\s\{\}"\\]/.test(text) || text.toLowerCase() === 'null' || text.length === 0) {
                        throw new Error('Invalid element input (it needs to be quoted): ' + text);
                    }

                    result.push(this.elementAdapter.fromSqlValue(text));

                    i += text.length - 1;
                    return {
                        state: ParserState.PossibleNextValue,
                    };
                }
                case ParserState.InValue: {
                    let charToAdd = value[i];
                    if (charToAdd === '"') {
                        const currentValue = currentState.currentValue.join('');
                        result.push(this.elementAdapter.fromSqlValue(currentValue));
                        return {
                            state: ParserState.PossibleNextValue,
                        };
                    }

                    if (charToAdd === '\\') {
                        i++;
                        charToAdd = value[i];
                        if (charToAdd !== '"' && charToAdd !== '\\') {
                            throw new Error(
                                `Invalid escape sequence '\\${charToAdd}' at position ${i - 1} in '${value}'. ` +
                                    `Only '\\\\' and '\\"' are allowed.`,
                            );
                        }
                    }

                    currentState.currentValue.push(charToAdd);
                    return currentState;
                }
                case ParserState.PossibleNextValue:
                    if (peekCaseInsensitive(this.delimiterCharacter)) {
                        while (value[i + 1] === this.delimiterCharacter) {
                            result.push(null);
                            i++;
                        }

                        if (value[i + 1] === '}') {
                            i++;
                            result.push(null);
                            return {
                                state: ParserState.AfterClosingBrace,
                            };
                        }
                        return {
                            state: ParserState.BeforeValue,
                        };
                    } else if (peekCaseInsensitive('}')) {
                        return {
                            state: ParserState.AfterClosingBrace,
                        };
                    }
                    throw new Error(
                        `Unexpected character '${value[i]}' at position ${i}, expected ` +
                            `'${this.delimiterCharacter}' or '}'.`,
                    );
                case ParserState.AfterClosingBrace:
                    throw new Error(`Unexpected character '${value[i]}' at position ${i}, expected end of string.`);

                default:
                    return assertNever(currentState, 'Unexpected parser state');
            }
        };

        for (i = 0; i < value.length; i++) {
            state = nextState(state);
            if (state.state !== ParserState.AfterClosingBrace) {
                throw new Error(`Unexpected end of string in '${value}'.`);
            }
            return result;
        }

        return result;
    }

    public toSqlValue(val: Maybe<T>[]): string {
        const elements: string[] = [];
        for (const element of val) {
            elements.push(this.quote(toSqlValue(element, this.elementAdapter)));
        }
        return `{${elements.join(`${this.delimiterCharacter}`)}}`;
    }

    public wrapInputValue(input: string): string {
        const x = this.elementAdapter.wrapInputValue('x');
        if (x === 'x') {
            return input;
        }
        const agg = this.elementAdapter.wrapInputValue('arr.i');
        const elementType = this.elementAdapter.databaseType;
        return `(SELECT array_agg(${agg}::${elementType}) FROM unnest(${input}::text[]) arr(i))`;
    }

    public wrapOutputValue(expr: string): string {
        const x = this.elementAdapter.wrapOutputValue('x');
        if (x === 'x') {
            return expr;
        }
        const agg = this.elementAdapter.wrapOutputValue('arr.i');
        return `(SELECT array_agg(${agg}::text) FROM unnest(${expr}) arr(i))`;
    }
}
