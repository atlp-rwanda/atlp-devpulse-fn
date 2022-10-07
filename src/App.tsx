import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Redux = React.lazy(() => import("./components/Counter/Counter"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Redux />} />
    </Routes>
  );
}

export default App;
