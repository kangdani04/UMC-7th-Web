import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import SearchMovieList from "../components/search-movie-list";

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const debouncedSearchValue = useDebounce(searchValue, 2000); // 200ms로 설정된 debounce

  const [searchParams, setSearchParams] = useSearchParams({ mq: "" });
  const mq = searchParams.get("mq");

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchMovie = () => {
    if (mq === searchValue) return;
    navigate(`/search?mq=${searchValue}`);
  };

  // `debouncedSearchValue`가 변경될 때마다 `navigate` 호출
  useEffect(() => {
    if (debouncedSearchValue.trim()) {
      navigate(`/search?mq=${debouncedSearchValue}`);
    }
  }, [debouncedSearchValue, navigate]);

  const handleSearchMovieWithKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchMovie();
    }
  };

  return (
    <Container>
      <SearchForm>
        <input
          placeholder="영화 제목을 입력하세요"
          value={searchValue}
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <button onClick={handleSearchMovie}>검색</button>
      </SearchForm>
      <SearchMovieList />
    </Container>
  );
};

export default SearchPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 15px;

  input {
    flex: 1;
    padding: 15px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
  }

  button {
    width: 80px;
    background-color: #ff1493;
    color: white;
    cursor: pointer;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
