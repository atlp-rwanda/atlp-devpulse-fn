import React from 'react';
import { Icon } from '@iconify/react';

export const generalSectionItems = [
  {
    path: '/admin',
    icon: <Icon icon="fontisto:pie-chart-1"></Icon>,
    title: 'Dashboard',
  },
  {
    path: 'calendar',
    icon: <Icon icon="ant-design:calendar-filled" />,
    title: 'Calendar',
  },
  {
    path: 'notifications',
    icon: <Icon icon="heroicons-solid:inbox-in" />,
    title: 'Notifications',
  },
];

export const managementSectionItems = [
  {
    path: 'organizations',
    icon: <Icon icon="fluent:people-team-20-filled"></Icon>,
    title: 'Organizations',
  },
  {
    path: 'users',
    icon: <Icon icon="fluent:people-team-20-filled"></Icon>,
    title: 'Members',
  },
  {
    path: 'programs',
    icon: <Icon icon="ic:round-maps-home-work"></Icon>,
    title: 'Programs',
  },
  {
    path: 'job-post',
    icon: <Icon icon="ic:round-maps-home-work"></Icon>,
    title: 'View Job Post',
  },
  {
    path: 'admins',
    icon: <Icon icon="ic:round-people"></Icon>,
    title: 'Admins',
  },
  {
    path: 'domains',
    icon: <Icon icon="akar-icons:globe"></Icon>,
    title: 'Domains',
  },
];

export const applicationsSectionItems = [
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
    path: 'Trainee-applicants',
    icon: <Icon icon="ic:round-people"></Icon>,
    title: 'Trainees-Applicants',
  },
  {
    path: 'attendance',
    icon: <Icon icon="teenyicons:clipboard-tick-solid"></Icon>,
    title: 'Attendance',
  },
  {
    path: 'performance',
    icon: <Icon icon="fa6-solid:arrow-trend-up"></Icon>,
    title: 'Performance',
  },
  {
    path: 'sessions',
    icon: <Icon icon="fluent:clipboard-bullet-list-ltr-16-filled"></Icon>,
    title: 'Sessions',
  },
  {
    path: 'coordinators',
    icon: <Icon icon="fluent:people-team-20-filled"></Icon>,
    title: 'Coordinators',
  },
  {
    path: 'cohort',
    icon: <Icon icon="fa6-solid:graduation-cap"></Icon>,
    title: 'Cohorts',
  },
  {
    path: 'cycles',
    icon: <Icon icon="game-icons:cycle"></Icon>,
    title: 'Application Cycles',
  },
];

// Performance and Grading Section
export const performanceSectionItems = [
  {
    path: 'updatedRatings',
    icon: <Icon icon="charm:refresh"></Icon>,
    title: 'Updated Ratings',
  },
  {
    path: 'grading',
    icon: <Icon icon="bxs:dashboard"></Icon>,
    title: 'Grading System',
  }
];

// Admin Section
export const adminSectionItems = [
  {
    path: 'roles',
    icon: <Icon icon="heroicons:key-20-solid"></Icon>,
    title: 'Roles & Access',
  },
  {
    path: 'notifications',
    icon: <Icon icon="heroicons-solid:inbox-in"></Icon>,
    title: 'Notifications',
  },
  {
    path: 'calendar',
    icon: <Icon icon="ant-design:calendar-filled"></Icon>,
    title: 'Calendar',
  },
  {
    path: 'Trash',
    icon: <Icon icon="fa-solid:trash"></Icon>,
    title: 'Trash',
  }
];

// Applicant Sidebar Items
export const applicantSidebarItems = [
  {
    path: 'myApplications',
    icon: <Icon icon="material-symbols:wysiwyg-rounded"></Icon>,
    title: 'My Applications',
  },
  {
    path: 'interviewScheduler',
    icon: (
      <Icon icon="material-symbols:interpreter-mode-outline-rounded"></Icon>
    ),
    title: 'Schedule Interview',
  },
  {
    path: 'notifications',
    icon: <Icon icon="heroicons-solid:inbox-in"></Icon>,
    title: 'Notifications',
  },
  {
    path: 'calendar',
    icon: <Icon icon="ant-design:calendar-filled"></Icon>,
    title: 'Calendar',
  },
  {
    path: 'available-jobs',
    icon: <Icon icon="ant-design:calendar-filled"></Icon>,
    title: 'Job Post ',
  },
];

// Additional Sidebar Items
export const additionalSidebarItems = [
  {
    path: 'documents',
    icon: <Icon icon="heroicons:document-20-solid" />,
    title: 'Docs',
  },
  {
    path: 'help',
    icon: <Icon icon="nimbus:globe" />,
    title: 'Help',

  },
  {
    path: 'settings',
    icon: <Icon icon="akar-icons:settings-vertical" />,
    title: 'settings',
  }
];

// Settings Sidebar Items
export const settingsSidebarItems = [
  {
    path: 'Logout',
    icon: <Icon icon="nimbus:arrow-left" />,
    title: 'Logout',
  }
];
