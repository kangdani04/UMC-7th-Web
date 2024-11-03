import Movie from './movie.jsx';
import styled from "styled-components";
import useCustomFetch from '../hooks/useCustomFetch.js';


const MovieList = ({ url }) => {
    const {data: movies, isLoading, isError}=useCustomFetch({url});
    
    if(isLoading){
        return (
            <>
                <h1>로딩 중 입니다</h1>
            </>
        )
     }

    if(isError){
        return (
             <>
                 <h1>오류 발생 : 관리자</h1>
             </>
       )
    }

    return (
        <CardList>
            {movies.results?.map((movie) => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </CardList>
    );
};

export default MovieList;

const CardList = styled.div`
    display: flex;
    flex-wrap: wrap; /* 요소들이 줄바꿈되도록 설정 */
    justify-content: left; /* 자식 요소 간의 간격을 균등하게 조절 */
    align-items: center;
`;