import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";

const App = React.lazy(() => import("./App"));

const container = document.getElementById("app")!;

const root = ReactDOMClient.createRoot(container).render(<App />);
