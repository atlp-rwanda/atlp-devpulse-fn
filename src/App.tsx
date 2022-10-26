import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';
import TestTailwind from "./components/TestTailwind";
// import TrainneeDetails from './pages/TrainneeDetails';
import TrainneeDetailsB from './pages/TrainneDetailsB';
import './index.css'
import  Sidebar  from './components/sidebar/sidebar';
import Test from './pages/test'


// const Counter = React.lazy(() => import("./components/Counter/Counter"));
// const TrainneeDetailsB = React.lazy(()=> import("./pages/TrainneDetailsB"))
// const TrainneeDetails =React.lazy(()=>import('./pages/TrainneeDetails'))

function App() {
  return (
    <Routes>
      {/* <Route path="/test_redux" element={<Counter />} /> */}
      <Route path="/test_tailwind" element={<TestTailwind />} />
      {/* <Route path='/trainee-details' element={<TrainneeDetails />}/> */}
      <Route path='/traineeb-details' element={<TrainneeDetailsB />}/>
      <Route path='/test-one' element={<Test />}/>
      <Route path="/sidebar" element={<Sidebar/>} />
    </Routes>
  );
}

export default App;
