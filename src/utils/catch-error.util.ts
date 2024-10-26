export async function catchError<T, E = Error>(
  promise: Promise<T>
): Promise<[undefined, T] | [E]> {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((err) => [err as E]);
}
