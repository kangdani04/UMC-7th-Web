// movie.jsx
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Movie = ({ movie }) => { // movie prop을 구조분해 할당
    console.log(movie.poster_path); // 확인용 콘솔 로그
    const navigate=useNavigate();
    return (
        <Card onClick={()=>{navigate(`/movies/${movie.id}`);}}>
            <StyledImg 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB의 포스터 이미지를 불러옵니다.
                alt={movie.title}
            />
            <Overlay/>
            <Title>
                {movie.title}
            </Title>
            <Date>
                {movie.release_date}
            </Date>
        </Card>
    );
};

export default Movie;

const Card = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    color:white;
    overflow:hidden;
    margin:15px;
    width: 130px; /* px 단위를 추가하여 적절한 크기 지정 */
    height:230px; /* px 단위를 추가하여 적절한 크기 지정 */
`;

const StyledImg=styled.img`
    object-fit:cover;
    border-radius: 10px; /* 모서리를 둥글게 설정 */
`;

const Overlay=styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4); /* 반투명 어두운 배경 */
    opacity: 0; /* 기본적으로 보이지 않음 */
    transition: opacity 0.3s; /* 부드러운 전환 효과 */
    
    ${Card}:hover & {
        opacity: 1; /* 마우스 오버 시 오버레이 보이게 */
    }
`;

const Title=styled.span`
    font-size:12px;
`
const Date=styled.span`
    font-size:9px;
`