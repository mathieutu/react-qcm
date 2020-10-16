import React, { useContext } from "react";
import { userContext } from "./contexts/UserContext";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Merci from "./pages/Merci";

const client = new ApolloClient({
  uri: "https://infinite-prawn-57.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const { user, isFinished } = useContext(userContext)!;

  if (isFinished) return <Merci />;

  return (
    <ApolloProvider client={client}>
      {user ? <Questions /> : <Login />}
    </ApolloProvider>
  );
}
