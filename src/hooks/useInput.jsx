import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const handler = (e) => {
    setValue(e.target.value);
    //console.log(value)
  };

  const resetValue = () => {
    setValue(""); // 값을 초기화하는 함수
  };

  return [value, handler, resetValue];
};

export default useInput;

// 아래로 리팩토링 예정

// import { useState } from "react";

// const useInput = () => {
//   const [value, setValue] = useState("");

//   const handler = (e) => {
//     if (e && e.target) {
//       setValue(e.target.value);
//     }
//   };

//   const resetValue = () => {
//     setValue(""); // 값 초기화
//   };

//   // 값, 핸들러, 초기화 함수를 반환합니다.
//   return [value, handler, resetValue];
// };

// export default useInput;
