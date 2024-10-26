export async function catchTypedError<
  T,
  E extends new (message?: string) => Error
>(
  promise: Promise<T>,
  errorsToCatch?: E[]
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error) => {
      if (!errorsToCatch || !errorsToCatch.length) return [error];

      if (errorsToCatch.some((err) => error instanceof err)) return [error];

      throw error;
    });
}
