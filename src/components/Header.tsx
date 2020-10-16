import React, { useContext } from "react";
import { userContext } from "../contexts/UserContext";

export default function Header() {
  const { user } = useContext(userContext)!;

  return (
    <div className="w-full bg-white shadow-md">
      <div className="container mx-auto flex">
        <div className="text-2xl font-bold py-4 flex-1">
          <span>ReactQCM</span>
        </div>
        <div className="py-4">
          <span className="text-2xl font-medium">{user?.name}</span>
        </div>
      </div>
    </div>
  );
}
