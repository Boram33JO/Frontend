import React, { useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const resetValue = () => {
    setValue(""); // 값을 초기화하는 함수
  };

  return [value, handler, resetValue] as const;
};

export default useInput;

