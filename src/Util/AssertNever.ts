export function assertNever(_: never, errorMsg: string): never {
    throw new Error(errorMsg);
}
