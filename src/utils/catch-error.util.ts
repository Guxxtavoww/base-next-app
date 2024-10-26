export async function catchError<T, E = Error>(
  promise: Promise<T>
): Promise<[undefined, T] | [E]> {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((err) => [err as E]);
}

// const [error, test] = await catchError(new Promise(res => setTimeout(res, 10)))
// if (error) {
//      console.log('handle the error');
    
// } else {
//     console.log(test)
// }