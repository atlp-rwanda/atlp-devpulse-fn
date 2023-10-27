import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TestTailwind from './../components/TestTailwind';
import TrainneeDetails from './../pages/TrainneeDetails';
import TrainneeDetailsB from './../pages/TrainneDetailsB';
import './../index.css';
import Sidebar from './../components/sidebar/sidebar';
import NavBar from './../components/sidebar/navHeader';
import Trainee from './../pages/TraineApplicant/Trainee';
import FilterTrainee from './../pages/FilterTeainee/FilterTrainee';
import Table from './../pages/Table';
import UpdateTraine from './../pages/updateTrainee/traineUpdate';
import CreateScoreType from './../pages/FilterTeainee/createScoreType';
import ScoreTypesActions from './../pages/FilterTeainee/ScoreTypesActions';
import ImportTraineeDetailsFromGoogleSheet from './../pages/importAndSaveManyTraineesFromGoogleSheet/importAndSaveManyTraineesFromGoogleSheet';

const Counter = React.lazy(() => import('./../components/Counter/Counter'));
import Trash from './../pages/Trash/Trash';
import ApplicationCycle from './../pages/ApplicationCycle/ApplicationCycle';
import LoginPage from './../pages/LoginPage';
import PrivateRoute from './../pages/PrivateRoute';
import PageNotFound from './../pages/PageNotFound';
import ListAllUsersPage from './../pages/roles&permissions/ListAllUsersPage';
import SignupForm from './../components/form/RegisterForm';
import Programs from '../pages/programs/Programs';
import SingleProgramDetails from '../pages/programs/SingleProgramDetails';
import RolePermission from '../pages/roles&permissions/RolePermission';
import CreateFormPage from './../pages/ApplicationForms/CreateApplicantForm';
import UpdateSavedFormPage from './../pages/ApplicationForms/UpdateSavedForm';
import ViewApplicationForms from './../pages/ApplicationForms/ViewApplicationForms';

function Navigation() {
  return (
    <Routes>
      <Route path='/test_tailwind' element={<TestTailwind />} />
      <Route
        path='/trainee-applicant-details/:traineeId'
        element={
          <PrivateRoute>
            <TrainneeDetails />
          </PrivateRoute>
        }
      />
      <Route
        path='/traineeb-details'
        element={
          <PrivateRoute>
            <TrainneeDetailsB />
          </PrivateRoute>
        }
      />
      <Route
        path='/Trainee-applicants'
        element={
          <PrivateRoute>
            <Trainee />
          </PrivateRoute>
        }
      />
      <Route
        path='/sidebar'
        element={
          <PrivateRoute>
            <Sidebar />
          </PrivateRoute>
        }
      />
      <Route
        path='/table'
        element={
          <PrivateRoute>
            <Table />
          </PrivateRoute>
        }
      />
      <Route
        path='/cycles'
        element={
          <PrivateRoute>
            <ApplicationCycle />
          </PrivateRoute>
        }
      />
      <Route
        path='/trash'
        element={
          <PrivateRoute>
            <Trash />
          </PrivateRoute>
        }
      />
      <Route
        path='/nav-bar'
        element={
          <PrivateRoute>
            <NavBar />
          </PrivateRoute>
        }
      />
      <Route
        path='/filter_trainee-applicants'
        element={
          <PrivateRoute>
            <FilterTrainee />
          </PrivateRoute>
        }
      />
      <Route
        path='/import_trainee-aplicants'
        element={
          <PrivateRoute>
            <ImportTraineeDetailsFromGoogleSheet />
          </PrivateRoute>
        }
      />
      <Route
        path='/trainee-applicant/:traineeId/edit'
        element={
          <PrivateRoute>
            <UpdateTraine />
          </PrivateRoute>
        }
      />
      <Route
        path='/'
        element={
          <PrivateRoute>
            <Trainee />
          </PrivateRoute>
        }
      />
      <Route
        path='/filter_trainee-applicants/:id'
        element={
          <PrivateRoute>
            <CreateScoreType />
          </PrivateRoute>
        }
      />
      <Route
        path='/rolesandaccess'
        element={
          <PrivateRoute>
            <RolePermission />
          </PrivateRoute>
        }
      />
      <Route
        path='/roles'
        element={
          <PrivateRoute>
            <ListAllUsersPage />
          </PrivateRoute>
        }
      />
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='/admins'
        element={
          <PrivateRoute>
            <ScoreTypesActions />
          </PrivateRoute>
        }
      />
      <Route
        path='/program/:id'
        element={
          <PrivateRoute>
            <SingleProgramDetails />
          </PrivateRoute>
        }
      />
      <Route
        path='/programs'
        element={
          <PrivateRoute>
            <Programs />
          </PrivateRoute>
        }
      />
      <Route
        path='*'
        element={
          <PrivateRoute>
            <PageNotFound />
          </PrivateRoute>
        }
      />
      <Route path='/signup' element={<SignupForm />} />
      <Route
        element={
          <PrivateRoute>
            <CreateFormPage />
          </PrivateRoute>
        }
        path='/create-form'
      />
      <Route
        element={
          <PrivateRoute>
            <ViewApplicationForms />
          </PrivateRoute>
        }
        path='/view-forms'
      />

      <Route
        element={
          <PrivateRoute>
            <UpdateSavedFormPage />
          </PrivateRoute>
        }
        path='/update-saved-form/:id'
      />
    </Routes>
  );
}

export default Navigation;
