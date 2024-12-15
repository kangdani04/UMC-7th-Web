import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance";

// Hook Props 타입 정의
type UseCustomFetchProps = {
  url: string; // URL은 항상 문자열이어야 함
};

// Hook 반환 타입 정의
type UseCustomFetchReturn<T> = {
  data: T | null; // 데이터는 제네릭 타입을 사용해 유연하게 처리
  isLoading: boolean; // 로딩 상태
  isError: boolean; // 에러 상태
};

const useCustomFetch = <T>({ url }: UseCustomFetchProps): UseCustomFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("URL:", url); // URL 확인

    const fetchData = async () => {
      setIsLoading(true);
      console.log("Fetching data..."); // 요청 시작 전에 로그 출력
      try {
        console.log("Making request to:", url); // URL 로그 확인
        const response = await axiosInstance.get<T>(url); // 제네릭 타입을 사용해 데이터 타입 명시
        console.log("Request Headers:", response.config.headers); // 요청 헤더 로그
        console.log("Response Status:", response.status); // 응답 상태 로그
        console.log(response.data); // API 응답 데이터 확인
        setData(response.data);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      fetchData(); // 컴포넌트가 마운트될 때 실행
    }
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetch;
