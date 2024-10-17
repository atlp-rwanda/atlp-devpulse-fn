import React from "react";
import { HashRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import TestTailwind from "./../components/TestTailwind";
import TrainneeDetails from "./../pages/TrainneeDetails";
import TrainneeDetailsB from "./../pages/TrainneDetailsB";
import "./../index.css";
import Sidebar from "./../components/sidebar/sidebar";
import NavBar from "./../components/sidebar/navHeader";
import ForgotPasswordPage from "./../pages/forgetpassword";
import Trainee from "./../pages/TraineApplicant/Trainee";
import FilterTrainee from "./../pages/FilterTeainee/FilterTrainee";
import FilterProgram from '../pages/programs/filterPrograms';
import FilterJobPost from '../pages/JobPost/fiterJopPost';
import ApplicantSeachJobPost from "../pages/JobPost/applicantJobFiltering"
import FilterRole from '../pages/roles&permissions/filterRolesAccess';
import Table from "./../pages/Table";
import ResetPasswordPage from "../pages/ResetPasswordPage";

import UpdateTraine from "./../pages/updateTrainee/traineUpdate";
import CreateScoreType from "./../pages/FilterTeainee/createScoreType";
import ScoreTypesActions from "./../pages/FilterTeainee/ScoreTypesActions";
import ImportTraineeDetailsFromGoogleSheet from "./../pages/importAndSaveManyTraineesFromGoogleSheet/importAndSaveManyTraineesFromGoogleSheet";

const Counter = React.lazy(() => import("./../components/Counter/Counter"));
import Trash from "./../pages/Trash/Trash";
import ApplicationCycle from "./../pages/ApplicationCycle/ApplicationCycle";
import LoginPage from "./../pages/LoginPage";
import PrivateRoute from "./../pages/PrivateRoute";
import PageNotFound from "./../pages/PageNotFound";
import ListAllUsersPage from "./../pages/roles&permissions/ListAllUsersPage";
import SignupForm from "./../components/form/RegisterForm";
import Programs from "../pages/programs/Programs";
import SingleProgramDetails from "../pages/programs/SingleProgramDetails";
import RolePermission from "../pages/roles&permissions/RolePermission";
import CreateFormPage from "./../pages/ApplicationForms/CreateApplicantForm";
import UpdateSavedFormPage from "./../pages/ApplicationForms/UpdateSavedForm";
import ViewApplicationForms from "./../pages/ApplicationForms/ViewApplicationForms";
import UpdateProgram from "../pages/programs/UpdateProgram";
import Jobs from "../pages/JobPost/job";
import SingleJobPostDetails from "../pages/JobPost/viewSingleJob";
import SharedPosts from "../pages/sharedPosts";
import Applications from "../pages/Applications";
import ScheduleInterview from "../pages/ScheduleInterview";
import SubmitApplication from "../pages/SubmitApplication";
import GradingSystemPage from "../pages/GradingSystemPage";
import ListApplications from "./../pages/Applications/AdminViewApplications";
import ApplicationDetails from "../pages/Applications/ViewSingleApplication";
import Dashboard from "../pages/Dashboard";
import ApplicantLayout from "../pages/Applicant/ApplicantLayout";
import AdminLayout from "../components/Layout/Admins/AdminLayout";
import GoogleSignup from "./../components/form/GoogleSignup";
import ApplicantDashboard from "../pages/Applicant/ApplicantDashboard";
import UpdateJobPost from "../pages/JobPost/updateJobPost";
import VerifyEmail from "../pages/verifyEmail";
import Search from "./../pages/search";

function Navigation() {
  const roleName = localStorage.getItem("roleName");
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/google" element={ <GoogleSignup /> } />
      <Route path="/forget" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route path="/signup" element={<SignupForm />} />
      <Route path="/verifyEmail" element={<VerifyEmail/>}/>
      <Route path="/pageNotFound" element={<PageNotFound />} />
      <Route path="/" element={
          roleName === 'Admin' || roleName === 'SuperAdmin' ? <Navigate to="/admin" /> : 
          roleName === 'Applicant' ? <Navigate to="/applicant" /> : <Navigate to="/login" />
      } />
      {/* Admin Routes (Protected) */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="trainee-applicant-details/:traineeId"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <TrainneeDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="application-details/:appId"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <ApplicationDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="traineeb-details"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <TrainneeDetailsB />
            </PrivateRoute>
          }
        />
        <Route
          path="Trainee-applicants"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <Trainee />
            </PrivateRoute>
          }
        />
        <Route
          path="cycles"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <ApplicationCycle />
            </PrivateRoute>
          }
        />
        <Route
          path="trash"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <Trash />
            </PrivateRoute>
          }
        />
        <Route
          path="filter_trainee-applicants"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <FilterTrainee />
            </PrivateRoute>
          }
        />
        
        <Route
          path="import_trainee-aplicants"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <ImportTraineeDetailsFromGoogleSheet />
            </PrivateRoute>
          }
        />
        <Route
          path="trainee-applicant/:traineeId/edit"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <UpdateTraine />
            </PrivateRoute>
          }
        />
        <Route
          path="filter_trainee-applicants/:id"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <CreateScoreType />
            </PrivateRoute>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <ListAllUsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="search"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="roles"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <RolePermission />
            </PrivateRoute>
          }
        />
        <Route
          path="admins"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <ScoreTypesActions />
            </PrivateRoute>
          }
        />
        <Route
          path="program/:programId/edit"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <UpdateProgram />
            </PrivateRoute>
          }
        />
        <Route
          path="program/:id"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <SingleProgramDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="programs"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <Programs />
            </PrivateRoute>
          }
        />
        <Route
          path="jobPost/:id/apply"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <SubmitApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="create-form"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <CreateFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="view-forms"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <ViewApplicationForms />
            </PrivateRoute>
          }
        />
        <Route
          path="update-saved-form/:id"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <UpdateSavedFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="job-Post"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="job/Post/:id"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <SingleJobPostDetails />
            </PrivateRoute>
          }
        />
          <Route
          path="job/post/edit/:programId"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <UpdateJobPost />
            </PrivateRoute>
          }
        />
        <Route
          path="grading"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <GradingSystemPage />
            </PrivateRoute>
          }
        />
        <Route
          path="view-applications"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <ListApplications />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute allowedRoles={['Admin', 'superAdmin']}>
              <PageNotFound />
            </PrivateRoute>
          }
        />
      </Route>
  
      {/* Applicant Routes (Protected) */}
      <Route path="/applicant" element={<ApplicantLayout />}>
      <Route index element={<PrivateRoute allowedRoles={['applicant']}><ApplicantDashboard/></PrivateRoute>} />
        <Route
          path="myApplications"
          element={
            <PrivateRoute allowedRoles={['applicant']}>
              <Applications />
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs"
          element={
            <PrivateRoute allowedRoles={['applicant']}>
              <ApplicantSeachJobPost />
            </PrivateRoute>
          }
        />
        {/* <Route
        path="filter_job_post"
        element={
          <PrivateRoute>
            <ApplicantSeachJobPost/>
          </PrivateRoute>
        }
      /> */}
        <Route
          path="available-job/:id/apply"
          element={
            <PrivateRoute allowedRoles={['applicant']}>
              <SubmitApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="interviewScheduler"
          element={
            <PrivateRoute allowedRoles={['applicant']}>
              <ScheduleInterview />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute allowedRoles={['applicant']}>
              <PageNotFound />
            </PrivateRoute>
          }
        />
      </Route>
  
      {/* Catch-All Route */}
      <Route
        path="*"
        element={
          <PrivateRoute allowedRoles={['Admin', 'applicant','superAdmin']}>
            <PageNotFound />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default Navigation;