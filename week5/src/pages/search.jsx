import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch';
import Movie from '../components/Card/movie';
import SearchMovieList from '../components/search-movie-list';
import { useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const SearchPage = () => {
    const [searchValue, setSearchValue]=useState('');
    const navigate=useNavigate();
    const debouncedSearchValue = useDebounce(searchValue, 2000); //200ms로 설정된 debounce
    const onChangeSearchValue=(event)=>{
        setSearchValue(event.target.value);
    }
    //console.log(searchValue,'검색결과값');
    const [searchParams, setSearchParams]=useSearchParams({
        mq:''
    });
    const mq=searchParams.get('mq');
    const handleSearchMovie=()=>{
        if(mq===searchValue) return;
        
        navigate(`/search?mq=${searchValue}`);
    }
    // `debouncedSearchValue`가 변경될 때마다 `navigate` 호출
    useEffect(() => {
        if (debouncedSearchValue.trim()) {
            navigate(`/search?mq=${debouncedSearchValue}`);
        }
    }, [debouncedSearchValue, navigate]); // debounce된 값에 따라 navigate가 호출됨
    const handleSearchMovieWithKeyboard=(e)=>{
        if(e.key==='Enter'){
            handleSearchMovie();
        }
    }
    return (
        <Container>
            <SearchForm>
                <input placeholder='영화 제목을 입력하세요' value={searchValue} 
                        onChange={onChangeSearchValue}
                        onKeyDown={handleSearchMovieWithKeyboard}/>
                <button onClick={handleSearchMovie}>검색</button>
            </SearchForm>
            <SearchMovieList/>
        </Container>
    );
};

export default SearchPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const SearchForm=styled.div`
    display:flex;
    justify-content: center;
    flex-direction:row;
    margin:15px;
    input{
        flex:1;
        padding:15px;
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
        border:1px solid rgb(220,220,220);
    }
    button{
        width:80px;
        background-color:#FF1493;
        color:white;
        cursor:pointer;
        border:none;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
    }
`