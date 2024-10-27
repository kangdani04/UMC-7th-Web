// styles/global.js (전역 스타일을 설정하는 파일)
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: black; // 검은색 배경
    color: white; // 기본 텍스트 색상
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;
