import React, { useState, useEffect } from 'react';
import loadinggosum from "../img/loadinggosum.png";
import styled from 'styled-components';

function Spinner() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prevRotation => (prevRotation + 1) % 360); // 회전 속도를 늦추기 위해 1도씩 증가하도록 수정
    }, 50); // 간격을 50ms로 조정하여 늦은 속도로 회전하도록 수정

    return () => clearInterval(interval);
  }, []);

  return (
    <StContainer>
      <StImg
        src={loadinggosum}
        alt="로딩 중..."
        style={{
          transform: `rotate(${rotation}deg)`
        }}
      />
    </StContainer>
  );
}

export default Spinner;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* 화면 상단 왼쪽에 고정 */
  top: 0;
  left: 0;
  width: 100%; /* 가로 폭을 화면 가득 채우도록 설정 */
  height: 100vh; /* 화면 전체 높이만큼 컨테이너를 늘려줍니다. */
  background-color: #eae7de;
  z-index: 10;
`;

const StImg = styled.img`
  width: 220px;
  height: 220px;
`;
