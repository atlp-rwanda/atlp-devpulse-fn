import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import App from "./App";
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
