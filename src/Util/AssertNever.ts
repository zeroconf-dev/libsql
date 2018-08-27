export function assertNever(_: never, errorMsg: string) {
    throw new Error(errorMsg);
}
