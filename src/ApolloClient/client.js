import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
// import { RestLink } from "apollo-link-rest";


export const client = new ApolloClient({
  uri: 'http://localhost:9001/core/contact',
  cache: new InMemoryCache(),
});