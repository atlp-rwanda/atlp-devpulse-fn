import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }: any) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }: any) => {
      alert(`gql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App = React.lazy(() => import("./App"));

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const container = document.getElementById("app")!;

const root = ReactDOMClient.createRoot(container).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer theme="colored" />
    </BrowserRouter>
  </Provider>
);
