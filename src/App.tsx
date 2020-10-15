import React, { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Login from "./pages/Login";
import Questions from "./pages/Questions";

export default function App() {
  const { email } = useContext(UserContext);

  if (!email) {
    return <Login />;
  } else {
    return <Questions />;
  }
}
