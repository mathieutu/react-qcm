import { useState } from "react";

export const useToggle = (initialState: boolean) => {
  const [value, setValue] = useState<boolean>(true);

  const toggle = () => {
    setValue((val) => !val);
  };

  return { toggle, value };
};
