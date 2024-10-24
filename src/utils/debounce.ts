export function debounce(func: Function, delay: number) {
  let timeout: NodeJS.Timeout;

  const debouncedFunction = (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    if (timeout) clearTimeout(timeout);
  };

  return debouncedFunction;
}
