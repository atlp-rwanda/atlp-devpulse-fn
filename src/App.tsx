import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';
import TestTailwind from "./components/TestTailwind";
import './index.css'

function App() {
  return (
    <Router>
      <TestTailwind />
    </Router>
  );
}

export default App