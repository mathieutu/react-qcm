import React, { createContext, PropsWithChildren, useEffect } from "react";
import { useState } from "react";

export type User = {
  email: string;
  name: string;
  id: string;
} | null;

type ContextType =
  | {
      user?: User;
      isFinished?: boolean;
      setIsFinished?(val: boolean): void;
      onUserChange?(user: User): void;
    }
  | undefined;

export const userContext = createContext<ContextType>(undefined);

export default function UserContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User>(null);
  const [isFinished, setIsFinished] = useState(false);

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
    <userContext.Provider
      value={{ user, onUserChange, isFinished, setIsFinished }}
    >
      {children}
    </userContext.Provider>
  );
}
