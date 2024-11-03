// movie.jsx
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import useCustomFetch from "../hooks/useCustomFetch";


const MovieDetail = ({url}) => { // movie prop을 구조분해 할당
    
    const { data: movie, isLoading, isError } = useCustomFetch({ url });
   

    // 로딩 및 에러 처리
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching movie details.</p>;

    // movie 데이터가 유효한지 확인
    if (!movie) return <p>No movie data available.</p>;

    const movieData = movie; // movie가 배열이 아닌 경우 이렇게 수정

    return (
        <Detail>
            <BackgroundImage backdrop_path={movieData.backdrop_path}>
                <Text>
                    <h2>{movieData.title}</h2>
                    <div>평균 : {movieData.vote_average}</div>
                    <div>{movieData.release_date}</div>
                    <div>{movieData.runtime}</div>
                    <Content>
                        <div>{movieData.overview}</div>
                    </Content>
                </Text>
            </BackgroundImage>
        </Detail>
        
    );
};

export default MovieDetail;

const Detail=styled.div`
    display:flex;
    flex-direction:column;
    color:white;
    background-color:black;
`
const BackgroundImage = styled.div`
    background-size: cover;
    background-image: 
        linear-gradient(to left,
                        rgba(0, 0, 0, 0) 0%,
                        
                        rgba(0, 0, 0, 0.5) 50%,
                        
                        rgba(0, 0, 0, 1) 100%),
        url(${props => `https://image.tmdb.org/t/p/w500${props.backdrop_path}`});
    width: 100%;
    height: 500px;
    border-radius: 40px;
    position: relative; /* 자식 요소에 대한 기준 설정 */
`;

const Text = styled.div`
    position: absolute; /* 배경 이미지 내에서 절대 위치 */
    top: 0; /* 상단에 위치 */
    left: 0; /* 좌측에 위치 */
    height: 100%; /* BackgroundImage와 동일한 높이 */
    width:30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* 위쪽 정렬 */
    border-bottom: 2px solid white; /* 하단에 흰색 border 추가 */
    padding: 10px; /* 여백 추가 (원하는 대로 조정 가능) */
    box-sizing: border-box; /* 패딩 포함하여 전체 높이를 유지 */
`;

const Content=styled.div`
    font-size:small;
`