import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const backendUrl = process.env.BACKEND_URL;
const websocketUrl: any = process.env.WEBSOCKET_URL;

console.log(websocketUrl);
const httpLink = createHttpLink({
  uri: backendUrl,
});

const wsClient = createClient({
  url: websocketUrl,
});

const wsLink = new GraphQLWsLink(wsClient);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
