import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const handler = (e) => {
    setValue(e.target.value);
    console.log(value)
  };

  const resetValue = () => {
    setValue(""); // 값을 초기화하는 함수
  };

  return [value, handler, resetValue];
};

export default useInput;
