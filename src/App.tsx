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

const Counter = React.lazy(() => import("./components/Counter/Counter"));

function App() {
  return (
    <Routes>
      <Route path="/test_redux" element={<Counter />} />
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path='/trainee-details' element={<TrainneeDetails />}/>
      <Route path='/traineeb-details' element={<TrainneeDetailsB />}/>
    </Routes>
  );
}

export default App;
