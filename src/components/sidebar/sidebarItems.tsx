/* eslint-disable  */
import React from "react";
import { Icon } from "@iconify/react";
import { title } from "process";

export const sidebarItems1 = [
  {
    path: "/admin",
    icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
    title: "Dashboard",
  },
  {
    path: "users",
    icon: <Icon icon="fluent:people-team-20-filled"></Icon>,
    title: "Members",
  },
  {
    path: "programs",
    icon: <Icon icon="ic:round-maps-home-work"></Icon>,
    title: "Programs",
  },
  {
    path: "notifications",
    icon: <Icon icon="heroicons-solid:inbox-in"></Icon>,
    title: "Notifications",
  },
  {
    path: "job-post",
    icon: <Icon icon="ic:round-maps-home-work"></Icon>,
    title: "View Job Post",
  },
  {
    path: "create-form",
    icon: <Icon icon="fluent:form-28-regular"></Icon>,
    title: "Application Forms",
  },
  {
    path: "view-applications",
    icon: <Icon icon="akar-icons:globe"></Icon>,
    title: "Applications",
  },
  {
    path: "cohort",
    icon: <Icon icon="fa6-solid:graduation-cap"></Icon>,
    title: "Cohorts",
  },
  {
    path: "cycles",
    icon: <Icon icon="game-icons:cycle"></Icon>,
    title: "Application Cycles",
  },
  {
    path: "grading",
    icon: <Icon icon="bxs:dashboard"></Icon>,
    title: "Grading System",
  },
  {
    path: "Trash",
    icon: <Icon icon="fa-solid:trash"></Icon>,
    title: "Trash",
  },
];

export const applicantSidebarItems = [
  {
    path: "myApplications",
    icon: <Icon icon="material-symbols:wysiwyg-rounded"></Icon>,
    title: "My Applications",
  },
  {
    path: "interviewScheduler",
    icon: (
      <Icon icon="material-symbols:interpreter-mode-outline-rounded"></Icon>
    ),
    title: "Schedule Interview",
  },
  {
    path: "notifications",
    icon: <Icon icon="heroicons-solid:inbox-in"></Icon>,
    title: "Notifications",
  },
  {
    path: "calendar",
    icon: <Icon icon="ant-design:calendar-filled"></Icon>,
    title: "Calendar",
  },
  {
    path: "available-jobs",
    icon: <Icon icon="ant-design:calendar-filled"></Icon>,
    title: "Job Post ",
  },
];

export const sidebarItems2 = [
  {
    path: "/documents",
    icon: <Icon icon="heroicons:document-20-solid"></Icon>,
    title: "Docs",
  },
  {
    path: "/help",
    icon: <Icon icon="nimbus:globe"></Icon>,
    title: "Help",
  },
];

export const sidebarItems3 = [
  {
    path: "/settings",
    icon: <Icon icon="eva:settings-2-outline"></Icon>,
    title: "Settings",
  },
];