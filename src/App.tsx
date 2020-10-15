import React, { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://infinite-prawn-57.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <ApolloProvider client={client}>
      {user ? <Questions /> : <Login />}
    </ApolloProvider>
  );
}
