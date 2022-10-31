import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';
import TestTailwind from "./components/TestTailwind";
import TrainneeDetails from './pages/TrainneeDetails';
import TrainneeDetailsB from './pages/TrainneDetailsB';
import './index.css'
import  Sidebar  from './components/sidebar/sidebar';
import Table from './containers/pages/Table';
import NavBar from "./components/sidebar/navHeader";
// function App() {
//   return (
//     <Router>
//       <TestTailwind />
//     </Router>
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

const Counter = React.lazy(() => import("./components/Counter/Counter"));
const ApplicationCycle = React.lazy(
  () => import("./pages/ApplicationCycle/ApplicationCycle")
);
const Trash = React.lazy(() => import("./pages/Trash/Trash"));

function App() {
  return (
    <Routes>
      {/* <Route path="/test_redux" element={<Counter />} /> */}
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path='/trainee-details' element={<TrainneeDetails />}/>
      <Route path='/traineeb-details' element={<TrainneeDetailsB />}/>
      <Route path="/sidebar" element={<Sidebar/>} />
      {/* <Route path="/Trainee" element={<Trainee />} /> */}
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/table" element={<Table />} />
      <Route path="/cycles" element={<ApplicationCycle />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/nav-bar" element={< NavBar/>} />


     
    </Routes>
  );
}

export default App;
