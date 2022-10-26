import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestTailwind from "./components/TestTailwind";
import TrainneeDetails from './pages/TrainneeDetails';
import TrainneeDetailsB from './pages/TrainneDetailsB';
import './index.css'
import  Sidebar  from './components/sidebar/sidebar';
import Test from './pages/test'


import Trainee from './containers/pages/TraineApplicant/Trainee';
import './index.css'
import Table from './containers/pages/Table';

import "./index.css";

const Counter = React.lazy(() => import("./components/Counter/Counter"));
const ApplicationCycle = React.lazy(
  () => import("./pages/ApplicationCycle/ApplicationCycle")
);

function App() {
  return (
    <Routes>
     
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path='/trainee-details' element={<TrainneeDetails />}/>
      <Route path='/traineeb-details' element={<TrainneeDetailsB />}/>
      <Route path='/test-one' element={<Test />}/>
      <Route path="/Trainee" element={<Trainee/>} />
      <Route path="/sidebar" element={<Sidebar/>} />
      <Route path="/table" element={<Table/>} />
      <Route path="/cycles" element={<ApplicationCycle />} />
    </Routes>
  );
}

export default App;
