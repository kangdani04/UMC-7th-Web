import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute; // 절대 위치 설정
  top: 0; // 상단 맞춤
  left: 0; // 좌측 맞춤
  width: 100%; // 전체 너비
  height: 100%; // 전체 높이
  background-color: rgba(0, 0, 0, 0.5); // 반투명 검정색 배경
  opacity: 0; // 기본적으로 보이지 않음
  transition: opacity 0.3s ease; // 부드러운 전환 효과
  display: flex; // 중앙 정렬을 위한 flex
  justify-content: center; // 수평 중앙 정렬
  align-items: center; // 수직 중앙 정렬
`;

export const MovieImage = styled.img`
  width: 100%; // 이미지 크기
  height: auto; // 비율 유지
  transition: transform 0.3s ease; // 부드러운 확대 효과
`;

export const CardContainer = styled.div`
  position: relative; // 위치 설정
  overflow: hidden; // 내용 넘침 방지

  &:hover {
    ${Overlay} {
      opacity: 1; // 호버 시 오버레이 보이기
    }

    ${MovieImage} {
      transform: scale(1.05); // 호버 시 이미지 확대
    }
  }
`;


export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 10px;
  background-color: #343a40;
  color: white;
`;

export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  justify-content: center;
  max-width: 100%;
`;

export const MovieTitle = styled.h3`
  margin: 5px 0;
`;

export const ReleaseDate = styled.p`
  margin: 0;
  font-size: 14px; // 필요한 대로 조정
`;