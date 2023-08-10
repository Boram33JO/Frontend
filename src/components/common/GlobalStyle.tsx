import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #141414; /* 원하는 배경색으로 설정 */
    /* 다른 전역 스타일도 여기에 추가 가능 */
    font-family: "Pretendard";
  }
`;

export default GlobalStyle;
