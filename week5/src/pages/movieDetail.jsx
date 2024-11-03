import { useParams } from 'react-router-dom';
import MovieDetail from '../components/movie-detail';
import MovieCredit from '../components/movie-credit';
import styled from 'styled-components';

const MovieDetailPage = () => {
    const {movieId} = useParams();
    const urlmovie = `${import.meta.env.VITE_TMDB_MOVIE_API_URL}/movie/${movieId}`; // URL 정의
    const urlcredit=`${import.meta.env.VITE_TMDB_MOVIE_API_URL}/movie/${movieId}/credits`; // URL 정의
    
    return (
        <Detail>
            <MovieDetail url={urlmovie}/>
            <MovieCredit url={urlcredit}/>
        </Detail>
        
       
    )    
}

export default MovieDetailPage;

const Detail=styled.div`
    display: flex;
    flex-direction: column;  /* 세로로 배치 */
    color: white;
    background-color: black;
    padding: 20px;  /* 여백 추가 */
    
    gap: 20px;  /* MovieDetail과 MovieCredit 사이에 간격 추가 */
`