import React, { useContext } from "react";
import { userContext } from "./contexts/UserContext";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://infinite-prawn-57.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const { user } = useContext(userContext);

  return (
    <ApolloProvider client={client}>
      {user ? <Questions /> : <Login />}
    </ApolloProvider>
  );
}
