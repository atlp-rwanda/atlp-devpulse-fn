import React from 'react';
import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';
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
import Trash from './../pages/Trash/Trash';
import ApplicationCycle from './../pages/ApplicationCycle/ApplicationCycle';
import LoginPage from './../pages/LoginPage';
import PrivateRoute from './../pages/PrivateRoute';
import PageNotFound from './../pages/PageNotFound';
import ListAllUsersPage from './../pages/roles&permissions/ListAllUsersPage';
import SignupForm from './../components/form/RegisterForm';
import Programs from '../pages/programs/Programs';
import CreateFormPage from './../pages/ApplicationForms/CreateApplicantForm';
import UpdateSavedFormPage from './../pages/ApplicationForms/UpdateSavedForm';
import ViewApplicationForms from './../pages/ApplicationForms/ViewApplicationForms';

const Counter = React.lazy(
  async () => await import('./../components/Counter/Counter')
);

function Navigation() {
  return (
    <Routes>
      <Route element={<TestTailwind />} path='/test_tailwind' />

      <Route
        element={
          <PrivateRoute>
            <TrainneeDetails />
          </PrivateRoute>
        }
        path='/trainee-applicant-details/:traineeId'
      />

      <Route
        element={
          <PrivateRoute>
            <TrainneeDetailsB />
          </PrivateRoute>
        }
        path='/traineeb-details'
      />

      <Route
        element={
          <PrivateRoute>
            <Trainee />
          </PrivateRoute>
        }
        path='/Trainee-applicants'
      />

      <Route
        element={
          <PrivateRoute>
            <Sidebar />
          </PrivateRoute>
        }
        path='/sidebar'
      />

      <Route
        element={
          <PrivateRoute>
            <Table />
          </PrivateRoute>
        }
        path='/table'
      />

      <Route
        element={
          <PrivateRoute>
            <ApplicationCycle />
          </PrivateRoute>
        }
        path='/cycles'
      />

      <Route
        element={
          <PrivateRoute>
            <Trash />
          </PrivateRoute>
        }
        path='/trash'
      />

      <Route
        element={
          <PrivateRoute>
            <NavBar />
          </PrivateRoute>
        }
        path='/nav-bar'
      />

      <Route
        element={
          <PrivateRoute>
            <FilterTrainee />
          </PrivateRoute>
        }
        path='/filter_trainee-applicants'
      />

      <Route
        element={
          <PrivateRoute>
            <ImportTraineeDetailsFromGoogleSheet />
          </PrivateRoute>
        }
        path='/import_trainee-aplicants'
      />

      <Route
        element={
          <PrivateRoute>
            <UpdateTraine />
          </PrivateRoute>
        }
        path='/trainee-applicant/:traineeId/edit'
      />

      <Route
        element={
          <PrivateRoute>
            <Trainee />
          </PrivateRoute>
        }
        path='/'
      />

      <Route
        element={
          <PrivateRoute>
            <CreateScoreType />
          </PrivateRoute>
        }
        path='/filter_trainee-applicants/:id'
      />

      <Route
        element={
          <PrivateRoute>
            <ListAllUsersPage />
          </PrivateRoute>
        }
        path='/rolesandaccess'
      />

      <Route element={<LoginPage />} path='/login' />

      <Route
        element={
          <PrivateRoute>
            <ScoreTypesActions />
          </PrivateRoute>
        }
        path='/admins'
      />

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

      <Route
        element={
          <PrivateRoute>
            <Programs />
          </PrivateRoute>
        }
        path='/programs'
      />

      <Route
        element={
          <PrivateRoute>
            <PageNotFound />
          </PrivateRoute>
        }
        path='*'
      />

      <Route element={<SignupForm />} path='/signup' />
    </Routes>
  );
}

export default Navigation;
