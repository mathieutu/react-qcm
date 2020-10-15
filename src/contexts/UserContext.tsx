import React, { createContext, PropsWithChildren, useEffect } from "react";
import { useState } from "react";

type ContextType = {
  email: string | null;
  onEmail(email: string): void;
};

export const UserContext = createContext<ContextType>({
  email: null,
  onEmail: () => {},
});

export default function UserContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const mailItem = localStorage.getItem("mail");
    if (mailItem) {
      setEmail(mailItem);
    }
  }, []);

  const handleEmailChange = (mail: string) => {
    localStorage.setItem("mail", mail);
    setEmail(mail);
  };

  return (
    <UserContext.Provider value={{ email, onEmail: handleEmailChange }}>
      {children}
    </UserContext.Provider>
  );
}
