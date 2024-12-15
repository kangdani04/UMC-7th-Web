import styled, { keyframes } from "styled-components";

type CardSkeletonProps = {
  number: number; // number prop의 타입 정의
};

const CardSkeleton: React.FC<CardSkeletonProps> = ({ number }) => {
  return (
    <>
      {Array.from({ length: number }).map((_, index) => (
        <Container key={index}>
          <CardMain />
          <TextWrapper>
            <TitleBox />
            <DescriptionBox />
          </TextWrapper>
        </Container>
      ))}
    </>
  );
};

export default CardSkeleton;

const skeleton = keyframes`
  0% { opacity: 1; }
  30% { opacity: 0.7; }
  50% { opacity: 0.4; }
  80% { opacity: 0.8; }
  100% { opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 15px;
`;

const CardMain = styled.div`
  width: 140px;
  height: 190px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  animation: ${skeleton} 1.5s infinite linear alternate;
`;

const TextWrapper = styled.div`
  width: 140px;
  height: 30px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 5px;
`;

const TitleBox = styled.div`
  background: #e0e0e0;
  height: 14px;
  border-radius: 5px;
  animation: ${skeleton} 1.5s infinite linear alternate;
`;

const DescriptionBox = styled.div`
  background: #e0e0e0;
  height: 10px;
  border-radius: 5px;
  animation: ${skeleton} 1.5s infinite linear alternate;
`;

