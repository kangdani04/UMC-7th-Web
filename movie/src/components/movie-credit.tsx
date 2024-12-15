import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

// 영화 크레딧 데이터 타입 정의
type CastMember = {
  id: number;
  name: string;
};

type Credits = {
  cast: CastMember[];
};

// 데이터 페칭 함수의 타입 정의
const fetchMovieCredit = async (url: string): Promise<Credits> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }
  return response.json();
};

type MovieCreditProps = {
  url: string; // 영화 크레딧을 가져올 URL
};

const MovieCredit: React.FC<MovieCreditProps> = ({ url }) => {
  const {
    data: credits,
    isLoading,
    isError,
    error,
  } = useQuery<Credits, Error>({
    queryKey: ["movieCredits", url], // Query Key는 배열로 전달
    queryFn: () => fetchMovieCredit(url), // Query Function은 함수로 전달
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 10, // 10분
  } as any);

  // 로딩 처리
  if (isLoading) {
    return <LoadingMessage>Loading credits...</LoadingMessage>;
  }

  // 에러 처리
  if (isError) {
    return <ErrorMessage>Error: {error.message}</ErrorMessage>;
  }

  // 데이터 유효성 확인
  if (!credits) {
    return <ErrorMessage>No credits available.</ErrorMessage>;
  }

  // 영화 출연진 렌더링
  return (
    <CreditSection>
      <h3>Cast</h3>
      <ul>
        {credits.cast?.map((cast) => (
          <li key={cast.id}>
            <span>{cast.name}</span>
          </li>
        ))}
      </ul>
    </CreditSection>
  );
};

export default MovieCredit;

const CreditSection = styled.section`
  color: white;
  margin-top: 20px;
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 5px 0;
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
`;
