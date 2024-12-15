import { useEffect, useState } from "react";

// useDebounce 함수 타입 정의
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // delay도 의존성에 포함

  return debouncedValue;
}

export default useDebounce;
