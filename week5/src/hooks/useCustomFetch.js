import { useEffect, useState } from "react"

import { axiosInstance } from "../apis/axios-instance"

const useCustomFetch=({url}) => {
    
    const[data, setData] = useState([]);
    const[isLoading, setIsLoading]=useState(false);
    const[isError,setIsError]=useState(false);

   
    useEffect(()=>{
        console.log("URL:", url); // URL 확인
        

        const fetchData=async()=>{
            setIsLoading(true);
            console.log("Fetching data..."); // 요청 시작 전에 로그 출력
            try{
                console.log("Making request to:", url); // URL 로그 확인
                const response=await axiosInstance.get(url);
                // 요청 헤더와 URL 출력
    
                console.log("Request Headers:", response.config.headers); // 요청 헤더 로그
                console.log("Response Status:", response.status); // 응답 상태 로그
                console.log(response.data); // API 응답 데이터 확인
                setData(response.data);
            }catch(error){
                setIsError(true);
                console.error("Error fetching data:", error);

            }finally{
                setIsLoading(false);
            }
        }
        if (url) { // URL이 있을 때만 호출
            fetchData(); // 컴포넌트가 마운트될 때 실행
        }
    },[url])
    return {data, isLoading, isError}
}

export default useCustomFetch;