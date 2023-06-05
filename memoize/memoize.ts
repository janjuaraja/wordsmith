type MemoizedFunction<T extends (...args: any[]) => any> = T & {
    cache: Map<string, ReturnType<T>>;
  };
  
  function memoize<T extends (...args: any[]) => any>(func: T): MemoizedFunction<T> {
    const cache: Map<string, ReturnType<T>> = new Map();
  
    const memoized = (...args: Parameters<T>): ReturnType<T> => {
      const key = generateKey(args);
  
      if (cache.has(key)) {
        return cache.get(key)!;
      }
  
      const result = func(...args);
      cache.set(key, result);
      return result;
    };
  
    return Object.assign(memoized, { cache });
  }
  
  function generateKey(args: any[]): string {
    const key = args.map(arg => stringify(arg)).join(':');
    return key;
  }
  
  function stringify(value: any): string {
    if (value === null || typeof value !== 'object') {
      return String(value);
    }
    return JSON.stringify(value);
  }
  
  function add(a: number, b: number): number {
    console.log('Performing calculation...');
    return a + b;
  }
  
  const memoizedAdd = memoize(add);
  
  console.log(memoizedAdd(2, 3)); // First calling, performs the calculation
  console.log(memoizedAdd(2, 3)); // Second calling, retrieves result from cache
  
  console.log(memoizedAdd(4, 5)); // First calling  with different arguments, performs the calculation
  console.log(memoizedAdd(4, 5)); // Second calling  with different arguments, retrieves result from cache