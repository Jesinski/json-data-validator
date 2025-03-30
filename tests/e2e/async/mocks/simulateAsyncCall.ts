export async function simulateAsyncCall(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Async value");
    }, 0);
  });
}
