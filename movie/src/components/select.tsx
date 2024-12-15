import styled from "styled-components";
import { SelImage } from "../mocks/category";
import { useNavigate } from "react-router-dom";

// 데이터 타입 정의
type Category = {
  id: string;
  name: string;
  image: string;
  link: string;
};

type SelImageType = {
  results: Category[];
};

const Select: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ImageContainer>
      {SelImage.results.map((category) => (
        <Card
          key={category.id}
          style={{ backgroundImage: `url(${category.image})` }} // 배경 이미지 설정
          onClick={() => navigate(category.link)}
        >
          <CategoryTitle>{category.name}</CategoryTitle>
        </Card>
      ))}
    </ImageContainer>
  );
};

export default Select;

// 스타일 컴포넌트 정의
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 요소들이 줄바꿈되도록 설정 */
  justify-content: space-around;
  align-items: center;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 10px;
  color: white;
  overflow: hidden;
  margin: 0px;
  margin-bottom: 15px;
  width: 330px; /* px 단위를 추가하여 적절한 크기 지정 */
  height: 230px; /* px 단위를 추가하여 적절한 크기 지정 */
  background-size: cover;
`;

const CategoryTitle = styled.h3`
  position: absolute; /* 위치를 절대값으로 설정 */
  bottom: 10px; /* 하단으로부터의 거리 */
  left: 10px; /* 좌측으로부터의 거리 */
  color: white;
  margin: 0; /* 기본 마진 제거 */
  font-size: 15px;
  padding: 3px 5px;
  background-color: rgba(0, 0, 0, 0.7); /* 불투명한 회색 배경 */
  border-radius: 5px;
`;
