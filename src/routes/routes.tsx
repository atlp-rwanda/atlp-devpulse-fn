import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestTailwind from "./../components/TestTailwind";
import TrainneeDetails from "./../pages/TrainneeDetails";
import TrainneeDetailsB from "./../pages/TrainneDetailsB";
import "./../index.css";
import Sidebar from "./../components/sidebar/sidebar";
import NavBar from "./../components/sidebar/navHeader";
import Trainee from "./../pages/TraineApplicant/Trainee";
import FilterTrainee from "./../pages/FilterTeainee/FilterTrainee";
import Table from "./../pages/Table";
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
import Notifications from "../pages/ApplicationCycle/Notifications";

function Navigation() {
  const roleName = localStorage.getItem("roleName");
  return (
    <Routes>
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route
          path="trainee-applicant-details/:traineeId"
          element={
            <PrivateRoute>
              <TrainneeDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="application-details/:appId"
          element={
            <PrivateRoute>
              <ApplicationDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="traineeb-details"
          element={
            <PrivateRoute>
              <TrainneeDetailsB />
            </PrivateRoute>
          }
        />
        <Route
          path="Trainee-applicants"
          element={
            <PrivateRoute>
              <Trainee />
            </PrivateRoute>
          }
        />
        <Route
          path="cycles"
          element={
            <PrivateRoute>
              <ApplicationCycle />
            </PrivateRoute>
          }
        />
        <Route
          path="trash"
          element={
            <PrivateRoute>
              <Trash />
            </PrivateRoute>
          }
        />
        <Route
          path="filter_trainee-applicants"
          element={
            <PrivateRoute>
              <FilterTrainee />
            </PrivateRoute>
          }
        />
        <Route
          path="import_trainee-aplicants"
          element={
            <PrivateRoute>
              <ImportTraineeDetailsFromGoogleSheet />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/trainee-applicant/:traineeId/edit"
          element={
            <PrivateRoute>
              <UpdateTraine />
            </PrivateRoute>
          }
        />
        <Route
          path="filter_trainee-applicants/:id"
          element={
            <PrivateRoute>
              <CreateScoreType />
            </PrivateRoute>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute>
              <ListAllUsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="roles"
          element={
            <PrivateRoute>
              <RolePermission />
            </PrivateRoute>
          }
        />
        <Route
          path="admins"
          element={
            <PrivateRoute>
              <ScoreTypesActions />
            </PrivateRoute>
          }
        />
        <Route
          path="program/:programId/edit"
          element={
            <PrivateRoute>
              <UpdateProgram />
            </PrivateRoute>
          }
        />
        <Route
          path="program/:id"
          element={
            <PrivateRoute>
              <SingleProgramDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="programs"
          element={
            <PrivateRoute>
              <Programs />
            </PrivateRoute>
          }
        />
        <Route
          path="jobPost/:id/apply"
          element={
            <PrivateRoute>
              <SubmitApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="create-form"
          element={
            <PrivateRoute>
              <CreateFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="view-forms"
          element={
            <PrivateRoute>
              <ViewApplicationForms />
            </PrivateRoute>
          }
        />
        <Route
          path="update-saved-form/:id"
          element={
            <PrivateRoute>
              <UpdateSavedFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="Job-Post"
          element={
            <PrivateRoute>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="Job/Post/:id"
          element={
            <PrivateRoute>
              <SingleJobPostDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="grading"
          element={
            <PrivateRoute>
              <GradingSystemPage />
            </PrivateRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <ListApplications />
            </PrivateRoute>
          }
          path="view-applications"
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <PageNotFound />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/applicant" element={<ApplicantLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Applications />
            </PrivateRoute>
          }
        />
        <Route
          path="myApplications"
          element={
            <PrivateRoute>
              <Applications />
            </PrivateRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <PrivateRoute>
              <Notifications/>
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs"
          element={
            <PrivateRoute>
              <SharedPosts />
            </PrivateRoute>
          }
        />
        <Route
          path="available-job/:id/apply"
          element={
            <PrivateRoute>
              <SubmitApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="interviewScheduler"
          element={
            <PrivateRoute>
              <ScheduleInterview />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <PageNotFound />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<PrivateRoute><PageNotFound /></PrivateRoute>}/>
    </Routes>
  );
}

export default Navigation;
