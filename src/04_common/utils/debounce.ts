export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(func: T, delay: number) {
  let timeout: number | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
