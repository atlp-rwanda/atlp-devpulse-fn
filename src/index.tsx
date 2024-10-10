import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
const App = React.lazy(() => import("./App"));

import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "./hooks/darkmode";
import store from "./redux/store";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import client from "./appoloClient";

const container = document.getElementById("app")!;

const root = ReactDOMClient.createRoot(container).render(
  <Provider store={store}>
    <HashRouter>
      <ThemeContextProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThemeContextProvider>
      <Toaster />
      <ToastContainer theme="colored" />
    </HashRouter>
  </Provider>
);
