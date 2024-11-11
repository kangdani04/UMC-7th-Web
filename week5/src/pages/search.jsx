import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch'; // useCustomFetch 훅 임포트
import Card from '../components/Card/movie'; // 영화 카드 컴포넌트 임포트
import useDebounce from '../hooks/useDebounce'; // 디바운스 훅 임포트

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const debouncedSearchValue = useDebounce(searchValue, 2000); // 2초 후 검색 처리

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value); // 검색어 변경 시 상태 업데이트
    };

    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    });

    const mq = searchParams.get('mq');

    // 검색어 변경 시 URL 업데이트
    const handleSearchMovie = () => {
        if (mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`);
    };

    // 디바운스된 값으로 URL을 갱신
    useEffect(() => {
        if (debouncedSearchValue.trim()) {
            navigate(`/search?mq=${debouncedSearchValue}`);
        }
    }, [debouncedSearchValue, navigate]);

    const handleSearchMovieWithKeyboard = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie();
        }
    };

    // URL을 debouncedSearchValue에 따라 변경
    const url = `/search/movie?query=${debouncedSearchValue}&include_adult=false&language=ko-KR&page=1`;

    // useCustomFetch 훅 사용하여 영화 데이터 불러오기
    const { data: movies, isLoading, isError } = useCustomFetch({ url });

    return (
        <SearchContainer>
            <input
                placeholder="영화 제목을 입력해주세요..."
                value={searchValue}
                onChange={onChangeSearchValue}
                onKeyDown={handleSearchMovieWithKeyboard}
            />
            <button onClick={handleSearchMovie}>검색</button>

            {/* 데이터 로딩 상태 처리 */}
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching data!</div>}

            {/* 영화 목록 렌더링 */}
            <MovieListContainer>
                {movies?.results?.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </MovieListContainer>
        </SearchContainer>
    );
};

export default SearchPage;

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    input {
        flex: 1;
        padding: 15px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid rgb(220, 220, 220);
        margin-bottom: 10px;
    }

    button {
        width: 80px;
        background-color: #ff1493;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        border: none;
    }
`;

const MovieListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
`;
