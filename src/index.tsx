import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";

const App = React.lazy(() => import("./App"));

// const container = document.getElementById("app")!;

// const root = ReactDOMClient.createRoot(container).render(<App />);
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// const App = React.lazy(() => import("./App"));

const container = document.getElementById("app")!;

const root = ReactDOMClient.createRoot(container).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
