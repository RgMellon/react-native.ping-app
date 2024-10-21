import { useState } from "react";

export function useFormInput(initialValue?: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(inputValue: string) {
    setValue(inputValue);
  }

  const inputProps = {
    value: value,
    onChangeText: handleChange,
  };

  return inputProps;
}
