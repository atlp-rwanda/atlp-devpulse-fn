import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

// Create an HTTP link
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql", // HTTP endpoint for queries/mutations
});

// Create a WebSocket client using the graphql-ws library
const wsClient = createClient({
  url: "ws://localhost:5000/graphql", // Ensure this matches the server's WebSocket path
});

// Create a GraphQLWsLink with the WebSocket client
const wsLink = new GraphQLWsLink(wsClient);

// Use the split function to direct queries and mutations to the HTTP link
// and subscriptions to the WebSocket link
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // If it's a subscription, send it to the WebSocket link
  httpLink // Otherwise, send it to the HTTP link
);

// Initialize the Apollo Client
const client = new ApolloClient({
  link: splitLink, // Use the split link
  cache: new InMemoryCache(), // Create a new instance of the InMemoryCache
});

// Export the client for use in your application
export default client;
