import React from 'react';
import { Icon } from '@iconify/react';

export const entity = [
  {
    title: "User",
    path: "/Trainee-applicants",
    icon: <Icon icon="fluent:people-team-20-filled"></Icon>,
    scope: [
      {
        path: "/filter_trainee-applicants",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Trainees-Applicants",
      },
      {
        path: "/Trainee-applicants/create",
        icon: <Icon icon="ic:round-people"></Icon>,
        title: "Create Trainee",
      },
      {
        path: "/dashboard",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Dashboard",
      },
    ],
  },

  {
    path: '/job-post',
    icon: <Icon icon="ic:round-maps-home-work"></Icon>,
    title: 'View Job Post',
  },
  {
    path: '/admins',
    icon: <Icon icon="ic:round-people"></Icon>,
    title: "Admins",
    scope: []
  },

  {
    title: "Programs",
    path: "/programs",
    icon: <Icon icon="ic:round-maps-home-work"></Icon>,
    scope: [
      {
        path: "/programs/list",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "View Programs",
      },
      {
        path: "/programs/create",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Create Programs",
      },
      {
        path: "/dashboard",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Dashboard",
      },
    ],
  },
  
  {
    title: "Cohorts",
    icon: <Icon icon="fa6-solid:graduation-cap"></Icon>,
    path: "/cohort",
    scope: [
      {
        path: "/cohorts/list",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "View Cohorts",
      },
      {
        path: "/cohorts/create",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Create Cohort",
      },
      {
        path: "/dashboard",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Dashboard",
      },
    ],
  },
  {
    title: "Application",
    icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
    path: "/application",
    scope: [
      {
        path: "/application/list",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "View Applications",
      },
      {
        path: "/application/create",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Create Application",
      },
      {
        path: "/dashboard",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Dashboard",
      },
    ],
  },
  {
    title: "Job Application",
    icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
    path: "/jobapplication",
    scope: [
      {
        path: "/jobapplication/list",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "View Job Post",
      },
      {
        path: "/jobapplication/create",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Create Job Application",
      },
    ],
  },
  {
    title: "Cycle",
    icon: <Icon icon="game-icons:cycle"></Icon>,
    path: "/cycles",
    scope: [
      {
        path: "/cycle/list",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "View Cycle",
      },
      {
        path: "/jobapplication/create",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Create A  Cycle",
      },
      {
        path: "/dashboard",
        icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
        title: "Dashboard",
      },
    ],
  },
  {
    path: '/grading',
    icon: <Icon icon="bxs:dashboard"></Icon>,
    title: 'Grading System',
  },
  {
    path: '/rolesandaccess',
    icon: <Icon icon="heroicons:key-20-solid"></Icon>,
    title: 'Roles & Access',
  },
  {
    path: '/myApplications',
    icon: <Icon icon="material-symbols:wysiwyg-rounded"></Icon>,
    title: 'My Applications',
  },
  {
    path: "/Trash",
    icon: <Icon icon="fa-solid:trash"></Icon>,
    title: 'Trash',
  },
];

export const applicantSidebarItems = [
  {
    path: '/myApplications',
    icon: <Icon icon="material-symbols:wysiwyg-rounded"></Icon>,
    title: 'My Applications',
  },
  {
    path: '/interviewScheduler',
    icon: (
      <Icon icon="material-symbols:interpreter-mode-outline-rounded"></Icon>
    ),
    title: 'Schedule Interview',
  },
  {
    path: '/notifications',
    icon: <Icon icon="heroicons-solid:inbox-in"></Icon>,
    title: 'Notifications',
  },
  {
    path: '/calendar',
    icon: <Icon icon="ant-design:calendar-filled"></Icon>,
    title: 'Calendar',
  },
  {
    path: '/job/Post/view',
    icon: <Icon icon="ant-design:calendar-filled"></Icon>,
    title: 'Job Post ',
  },
];
export const sidebarItems2 = [
  {
    path: '/documents',
    icon: <Icon icon="heroicons:document-20-solid"></Icon>,
    title: 'Docs',
  },
  {
    path: '/help',
    icon: <Icon icon="nimbus:globe"></Icon>,
    title: 'Help',
  },
  {
    path: '/Logout',
    icon: <Icon icon="nimbus:arrow-left"></Icon>,
    title: 'Logout',
  },
];

export const sidebarItems3 = [
  {
    path: '/settings',
    icon: <Icon icon="akar-icons:settings-vertical"></Icon>,
  },
  {
    path: '/settings',
    icon: <Icon icon="eva:settings-2-outline"></Icon>,
  },
];
