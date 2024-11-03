import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch"
import Credit from "./credit";

const MovieCredit=({url})=>{
    const {data:credit, isLoading, isError}=useCustomFetch({url});

    // 로딩 및 에러 처리
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching movie details.</p>;

    // movie 데이터가 유효한지 확인
    if (!credit) return <p>No movie data available.</p>;

    console.log(credit);


    return (
        <Block>
            {credit.cast?.map((creditItem) => (
                <Credit key={creditItem.id} credit={creditItem} />
            ))}
        </Block>
        
    )
   

}

export default MovieCredit;

const Block=styled.div`
    display: flex;
    flex-wrap: wrap; /* 요소들이 줄바꿈되도록 설정 */
    color: white;
    background-color: black;
    padding: 20px; /* 추가된 패딩 */
    justify-content: center;
    align-items: center;
    gap:10px;
`
