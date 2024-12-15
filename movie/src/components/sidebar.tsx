import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  return (
    <Side>
      <Category>
        <StyledLink onClick={() => navigate(`search`)}>
          <IoMdSearch />
          <Text>찾기</Text>
        </StyledLink>
      </Category>
      <Category>
        <StyledLink onClick={() => navigate(`movies`)}>
          <BiSolidMoviePlay />
          <Text>영화</Text>
        </StyledLink>
      </Category>
      <Category>
        <StyledLink onClick={() => navigate(`genres`)}>
          <FaFilm />
          <Text>장르별 영화</Text>
        </StyledLink>
      </Category>
      {isLogin && (
        <Category>
          <StyledLink onClick={() => navigate("profile")}>
            <Text>내 정보</Text>
          </StyledLink>
        </Category>
      )}
    </Side>
  );
};

export default Sidebar;

// 스타일 컴포넌트 정의
const Side = styled.aside`
  margin: 0px;
  padding: 0px;
  width: 200px;
  height: 100%;

  display: flex;
  flex-direction: column;
  color: white;
  background-color: #282828;
`;

const Category = styled.div`
  margin: 20px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Text = styled.span`
  margin-left: 10px;
  color: white;
`;

const StyledLink = styled.button`
  background-color: transparent;
  margin: 0px;
  padding: 0px;
  border: none;
  color: inherit; /* 부모의 색상(흰색)을 상속받음 */
  display: flex;
  align-items: center; /* 아이콘과 텍스트를 세로 정렬 */
`;
