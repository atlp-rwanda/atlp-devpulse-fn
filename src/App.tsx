import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestTailwind from "./components/TestTailwind";
import Trainee from "./containers/pages/TraineApplicant/Trainee";
import "./index.css";
import Sidebar from "./components/sidebar/sidebar";
import Table from "./containers/pages/Table";
import Trash from "./pages/Trash/Trash";
import ApplicationCycle from "./pages/ApplicationCycle/ApplicationCycle";
import Counter from "./components/Counter/Counter";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/test_redux" element={<Counter />} />
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path="/Trainee" element={<Trainee />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/table" element={<Table />} />
      <Route path="/cycles" element={<ApplicationCycle />} />
      <Route path="/trash" element={<Trash />} />
    </Routes>
  );
}

export default App;
