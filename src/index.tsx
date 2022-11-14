import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";

const App = React.lazy(() => import("./App"));

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeContextProvider } from './hooks/darkmode';
import store from "./redux/store";

const container = document.getElementById("app")!;

const root = ReactDOMClient.createRoot(container).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
      <ToastContainer theme="colored" />
    </BrowserRouter>
  </Provider>
);
