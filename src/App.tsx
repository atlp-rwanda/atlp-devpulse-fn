import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';
import TestTailwind from "./components/TestTailwind";
import Trainee from './containers/pages/Trainee';
import './index.css'

// function App() {
//   return (
//     <Router>
//       <TestTailwind />
//     </Router>
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Counter = React.lazy(() => import("./components/Counter/Counter"));

function App() {
  return (
    <Routes>
      <Route path="/test_redux" element={<Counter />} />
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path="/Trainee" element={<Trainee/>} />
    </Routes>
  );
}

export default App;
