import React, { createContext, PropsWithChildren, useEffect } from "react";
import { useState } from "react";

export type User = {
  email: string;
  name: string;
  id: string;
} | null;

type ContextType = {
  user: User;
  onUserChange(user: User): void;
};

export const userContext = createContext<ContextType>({
  user: null,
  onUserChange: () => {},
});

export default function UserContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const userItem = localStorage.getItem("userLogged");
    if (userItem) {
      setUser(JSON.parse(userItem) as User);
    }
  }, []);

  const onUserChange = (usr: User) => {
    setUser({ email: usr!.email, id: usr!.id, name: usr!.name });
    localStorage.setItem("userLogged", JSON.stringify(usr));
    console.log(usr);
  };

  return (
    <userContext.Provider value={{ user, onUserChange }}>
      {children}
    </userContext.Provider>
  );
}
