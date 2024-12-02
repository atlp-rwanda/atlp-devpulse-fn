import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import TestTailwind from "./../components/TestTailwind";
import TrainneeDetails from "./../pages/TrainneeDetails";
import TrainneeDetailsB from "./../pages/TrainneDetailsB";
import "./../index.css";
import Sidebar from "./../components/sidebar/sidebar";
import NavBar from "./../components/sidebar/navHeader";
import ForgotPasswordPage from "./../pages/forgetpassword";
import Trainee from "./../pages/TraineApplicant/Trainee";
import FilterTrainee from "./../pages/FilterTeainee/FilterTrainee";
import FilterProgram from "../pages/programs/filterPrograms";
import FilterJobPost from "../pages/JobPost/fiterJopPost";
import ApplicantSeachJobPost from "../pages/JobPost/applicantJobFiltering";
import FilterRole from "../pages/roles&permissions/filterRolesAccess";
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
import { ApplicantApplication } from "../pages/Applications/ApplicantApplication";
// import ScheduleInterview from "../pages/Schedules";
import SubmitApplication from "../pages/SubmitApplication";
import GradingSystemPage from "../pages/GradingSystemPage";
import ListApplications from "./../pages/Applications/AdminViewApplications";
import ApplicationDetails from "../pages/Applications/ViewSingleApplication";
import Dashboard from "../pages/Dashboard";
import ApplicantLayout from "../pages/Applicant/ApplicantLayout";
import AdminLayout from "../components/Layout/Admins/AdminLayout";
import GoogleSignup from "./../components/form/GoogleSignup";
import ApplicantNotifications from "../pages/ApplicantNotifications/AppNotification";
import ApplicantDashboard from "../pages/Applicant/ApplicantDashboard";
import UpdateJobPost from "../pages/JobPost/updateJobPost";
import VerifyEmail from "../pages/verifyEmail";
import Search from "./../pages/search";
import Settings from "../components/settings";
import ProfileUpdate from "../pages/ProfilePage";
import Profile from "../pages/Profile";
import SignupPage from "./../pages/SignupPage";
import ApplicantStages from "./../pages/TraineApplicant/ApplicantStages";
import AdminNotification from "../pages/AdminNotifications/AdminNotifications";
import { MyApplication } from "../pages/ApplicationCycle/myApplication";
import ApplyJobPost from "../pages/ApplyJobPost"

import TraineeApply from "../pages/TraineeApply/TraineeApply";
import TraineeAttribute from "../pages/TraineeApply/TraineeAttribute";
import TraineeSuccessPage from "../pages/TraineeApply/TraineeSuccess";
import TicketPage from "../pages/tickets/ticketPage";
import AdminTicketPage from "../pages/tickets/adminTicketPage";
import SingleTicketDetails from "../pages/tickets/singleTicketDetails";
import ResolveTicketPage from "../pages/tickets/adminTicketResolve";
import ReplyTicketPage from "../pages/tickets/applicantTicketReply";
import CohortPage from "../pages/Cohort/Cohort";
import CohortsDetailPage from "../pages/Cohort/CohortDetailPage";
import AllBlogs from "../pages/Blogs/allBlogs";
import SingleBlogView from "../pages/Blogs/singleBlog";
import SingleBlogPage from "../pages/LandingPage/SingleBlogPage"
import LandingPage from "../pages/LandingPage/LandingPage";
import Blogs from "../pages/Blogs/Blogs"
import ViewExternalDocuments from "../pages/viewExternalDocuments";

function Navigation() {
  const roleName = localStorage.getItem("roleName");
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/google" element={<GoogleSignup />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/forget" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/home" element={<LandingPage/>}/>      <Route path="/view-external-document" element={
          <ViewExternalDocuments />
      }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verifyEmail" element={<VerifyEmail />} />
      <Route path="/pageNotFound" element={<PageNotFound />} />
      <Route path="settings" element={<Settings />} />
    <Route path="blogs/:id" element={<SingleBlogPage/>}/>
      <Route
        path="/"
        element={
          roleName === "admin" || roleName === "SuperAdmin" ? (
            <Navigate to="/admin" />
          ) : roleName === "Applicant" ? (
            <Navigate to="/applicant" />
          ) : roleName === "trainee" ? (
            <Navigate to="/trainee" />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      {/* admin Routes (Protected) */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="update-profile"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ProfileUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="update-profile"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ProfileUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <AdminNotification />
            </PrivateRoute>
          }
        />
        <Route
          path="trainee-applicant-details/:traineeId"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <TrainneeDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="application-details/:appId"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ApplicationDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="traineeb-details"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <TrainneeDetailsB />
            </PrivateRoute>
          }
        />
        <Route
          path="Trainee-applicants"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <Trainee />
            </PrivateRoute>
          }
        />

        <Route
          path="cycles/application-stages/:cycleName"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ApplicantStages />
            </PrivateRoute>
          }
        />
        <Route
          path="cycles"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ApplicationCycle />
            </PrivateRoute>
          }
        />
        <Route
          path="cohort"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <CohortPage />
            </PrivateRoute>
          }
        />
        <Route
          path="cohort-details/:id"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <CohortsDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="trash"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <Trash />
            </PrivateRoute>
          }
        />
        <Route
          path="filter_trainee-applicants"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <FilterTrainee />
            </PrivateRoute>
          }
        />

        <Route
          path="import_trainee-aplicants"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ImportTraineeDetailsFromGoogleSheet />
            </PrivateRoute>
          }
        />
        <Route
          path="trainee-applicant/:traineeId/edit"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <UpdateTraine />
            </PrivateRoute>
          }
        />
        <Route
          path="filter_trainee-applicants/:id"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <CreateScoreType />
            </PrivateRoute>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ListAllUsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="search"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="roles"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <RolePermission />
            </PrivateRoute>
          }
        />
        <Route
          path="admins"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ScoreTypesActions />
            </PrivateRoute>
          }
        />
        <Route
          path="program/:programId/edit"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <UpdateProgram />
            </PrivateRoute>
          }
        />
        <Route
          path="program/:id"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <SingleProgramDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="programs"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <Programs />
            </PrivateRoute>
          }
        />
        <Route
          path="blogs"
          element={
            <PrivateRoute
              allowedRoles={["admin", "applicant", "superAdmin", "trainee"]}
            >
              <AllBlogs />
            </PrivateRoute>
          }
        />
        <Route
          path="blogs/:id"
          element={
            <PrivateRoute
              allowedRoles={["admin", "applicant", "superAdmin", "trainee"]}
            >
              <SingleBlogView />
            </PrivateRoute>
          }
        />
        <Route
          path="jobPost/:id/apply"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <SubmitApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="create-form"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <CreateFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="view-forms"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ViewApplicationForms />
            </PrivateRoute>
          }
        />
        <Route
          path="update-saved-form/:id"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <UpdateSavedFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="job-Post"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="job/Post/:id"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <SingleJobPostDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="job/post/edit/:programId"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <UpdateJobPost />
            </PrivateRoute>
          }
        />
        <Route
          path="grading"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <GradingSystemPage />
            </PrivateRoute>
          }
        />
        <Route
          path="view-applications"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ListApplications />
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="tickets"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <AdminTicketPage  />
            </PrivateRoute>
          }
        />
        <Route
          path="ticket/:id"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <SingleTicketDetails  />
            </PrivateRoute>
          }
        />
        <Route
          path="ticket/:id/resolve"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ResolveTicketPage  />
            </PrivateRoute>
          }
        />
        <Route
          path="tickets"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <AdminTicketPage  />
            </PrivateRoute>
          }
        />
        <Route
          path="ticket/:id"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <SingleTicketDetails  />
            </PrivateRoute>
          }
        />
        <Route
          path="ticket/:id/resolve"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <ResolveTicketPage  />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute allowedRoles={["admin", "superAdmin"]}>
              <PageNotFound />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Applicant Routes (Protected) */}
      <Route
        path="/applicant"
        element={
          <PrivateRoute allowedRoles={["applicant", "trainee"]}>
            <ApplicantLayout />
          </PrivateRoute>
        }
      />
      {/* <Route
          index
          element={
            <PrivateRoute allowedRoles={['applicant']}>
              <Applications />
            </PrivateRoute>
          }
        /> */}
      <Route path="/applicant" element={<ApplicantLayout />}>
        <Route
          index
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ApplicantDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="myApplications"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ApplicantApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="myapplication"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <MyApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
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
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <SubmitApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="available-job/:id/apply/submit"
          element={
            <PrivateRoute allowedRoles={['applicant']}>
              <ApplyJobPost />
            </PrivateRoute>
          }
        />
        <Route
          path="tickets"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <TicketPage />
            </PrivateRoute>
          }
        />
        <Route
          path="ticket/:id"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <SingleTicketDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="ticket/:id/reply"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ReplyTicketPage />
            </PrivateRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ApplicantNotifications />
            </PrivateRoute>
          }
        />
        <Route
          path="blogs"
          element={
            <PrivateRoute
              allowedRoles={["admin", "applicant", "superAdmin", "trainee"]}
            >
              <AllBlogs />
            </PrivateRoute>
          }
        />
        <Route
          path="blogs/:id"
          element={
            <PrivateRoute
              allowedRoles={["admin", "applicant", "superAdmin", "trainee"]}
            >
              <SingleBlogView />
            </PrivateRoute>
          }
        />
        <Route
          path="update-profile"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ProfileUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs/trainee-apply"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <TraineeApply />
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs/trainee-apply/trainee-success/:traineeId"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <TraineeSuccessPage />
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs/trainee-apply/trainee-success/trainee-add-attributes/:traineeId?"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <TraineeAttribute />
            </PrivateRoute>
          }
        />
      </Route>

      <Route
        path="/trainee"
        element={
          <PrivateRoute allowedRoles={["applicant", "trainee"]}>
            <ApplicantLayout />
          </PrivateRoute>
        }
      />
      <Route path="/trainee" element={<ApplicantLayout />}>
        <Route
          index
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ApplicantDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="myApplications"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ApplicantApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="myapplication"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <MyApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ApplicantSeachJobPost />
            </PrivateRoute>
          }
        />
        <Route
          path="available-job/:id/apply"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <SubmitApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="tickets"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <TicketPage  />
            </PrivateRoute>
          }
        />
        <Route
          path="ticket/:id"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <SingleTicketDetails  />
            </PrivateRoute>
          }
        />
        <Route
          path="ticket/:id/reply"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ReplyTicketPage  />
            </PrivateRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ApplicantNotifications />
            </PrivateRoute>
          }
        />
        <Route
          path="blogs"
          element={
            <PrivateRoute
              allowedRoles={["admin", "applicant", "superAdmin", "trainee"]}
            >
              <AllBlogs />
            </PrivateRoute>
          }
        />
        <Route
          path="blogs/:id"
          element={
            <PrivateRoute
              allowedRoles={["admin", "applicant", "superAdmin", "trainee"]}
            >
              <SingleBlogView />
            </PrivateRoute>
          }
        />
        <Route
          path="update-profile"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <ProfileUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs/trainee-apply"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <TraineeApply />
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs/trainee-apply/trainee-success/:traineeId"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <TraineeSuccessPage />
            </PrivateRoute>
          }
        />
        <Route
          path="available-jobs/trainee-apply/trainee-success/trainee-add-attributes/:traineeId?"
          element={
            <PrivateRoute allowedRoles={["applicant", "trainee"]}>
              <TraineeAttribute />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Catch-All Route */}
      <Route
        path="*"
        element={
          <PrivateRoute
            allowedRoles={["admin", "applicant", "superAdmin", "trainee"]}
          >
            <PageNotFound />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default Navigation;
