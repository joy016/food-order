import { useState } from "react";

const UseInput = (validateValue) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const hasError = !valueIsValid && (isTouched || value !== "");

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setIsTouched(false);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const resetValue = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    hasError,
    onChange: handleInputChange,
    onBlur: handleBlur,
    resetValue,
    valueIsValid,
  };
};

export default UseInput;
