import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestTailwind from "./components/TestTailwind";
import TrainneeDetails from "./pages/TrainneeDetails";
import TrainneeDetailsB from "./pages/TrainneDetailsB";
import "./index.css";
import Sidebar from "./components/sidebar/sidebar";
import "./index.css";
import "./index.css";
import NavBar from "./components/sidebar/navHeader";
import Trainee from "./pages/TraineApplicant/Trainee";
import FilterTrainee from "./pages/FilterTeainee/FilterTrainee";
import "./index.css";
import Table from "./pages/Table";
import UpdateTraine from "./pages/updateTrainee/traineUpdate";
import CreateScoreType from "./pages/FilterTeainee/createScoreType";
import ScoreTypesActions from "./pages/FilterTeainee/ ScoreTypesActions";
import "./index.css";
import ImportTraineeDetailsFromGoogleSheet from "./pages/importAndSaveManyTraineesFromGoogleSheet/importAndSaveManyTraineesFromGoogleSheet";

const Counter = React.lazy(() => import("./components/Counter/Counter"));
import Trash from './pages/Trash/Trash'
import ApplicationCycle  from './pages/ApplicationCycle/ApplicationCycle'

function App() {
  return (
    <Routes>
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path="/trainee-applicant-details/:traineeId" element={<TrainneeDetails />} />
      <Route path="/traineeb-details" element={<TrainneeDetailsB />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/Trainee-applicants" element={<Trainee />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/table" element={<Table />} />
      <Route path="/cycles" element={<ApplicationCycle />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/nav-bar" element={<NavBar />} />
      <Route path="/filter_trainee-applicants" element={<FilterTrainee />} />
      <Route path="/import_trainee-aplicants" element={<ImportTraineeDetailsFromGoogleSheet />}/>
      <Route path="/trainee-applicant/:traineeId/edit" element={<UpdateTraine />} />
      <Route path="/" element={<Trainee />} />
      <Route path="/filter_trainee-applicants/:id" element={<CreateScoreType />} />
      <Route path="/admins/" element={<ScoreTypesActions />} />
    </Routes>
  );
}

export default App;
