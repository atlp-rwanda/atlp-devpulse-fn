import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestTailwind from "./components/TestTailwind";
import "./index.css";

const Counter = React.lazy(() => import("./components/Counter/Counter"));
const ApplicationCycle = React.lazy(
  () => import("./components/ApplicationCycle/ApplicationCycle")
);

function App() {
  return (
    <Routes>
      <Route path="/test_redux" element={<Counter />} />
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path="/cycle" element={<ApplicationCycle />} />
    </Routes>
  );
}

export default App;
