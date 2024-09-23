import React from 'react';
import { Icon } from '@iconify/react';

export const generalSectionItems = [
  {
    path: '/dashboard',
    icon: <Icon icon="fontisto:pie-chart-1" />,
    title: 'Dashboard',
  },
  {
    path: '/calendar',
    icon: <Icon icon="ant-design:calendar-filled" />,
    title: 'Calendar',
  },
  {
    path: '/notifications',
    icon: <Icon icon="heroicons-solid:inbox-in" />,
    title: 'Notifications',
  },
];

export const managementSectionItems = [
  {
    path: '/organisations',
    icon: <Icon icon="fluent:people-team-20-filled" />,
    title: 'Organisations',
  },
  {
    path: '/roles',
    icon: <Icon icon="fluent:people-team-20-filled" />,
    title: 'Members',
  },
  {
    path: '/admins',
    icon: <Icon icon="ic:round-people" />,
    title: 'Admins',
  },
 
];

export const applicationsSectionItems = [
  {
    path: '/create-form',
    icon: <Icon icon="fluent:form-28-regular" />,
    title: 'Application Forms',
  },
  {
    path: '/view-applications',
    icon: <Icon icon="akar-icons:globe" />,
    title: 'Applications',
  },
  {
    path: '/programs',
    icon: <Icon icon="ic:round-maps-home-work" />,
    title: 'Programs',
  },
  {
    path: '/job-post',
    icon: <Icon icon="ic:round-maps-home-work" />,
    title: 'View Job Post',
  },
  {
    path: '/cohort',
    icon: <Icon icon="fa6-solid:graduation-cap" />,
    title: 'Cohorts',
  },
  {
    path: '/cycles',
    icon: <Icon icon="game-icons:cycle" />,
    title: 'Application Cycles',
  },
];

// Performance and Grading Section
export const performanceSectionItems = [
  {
    path: '/attendance',
    icon: <Icon icon="teenyicons:clipboard-tick-solid" />,
    title: 'Attendance',
  },
  
  {
    path: '/grading',
    icon: <Icon icon="bxs:dashboard" />,
    title: 'Grading System',
  }
];

// Admin Section
export const adminSectionItems = [
  
  {
    path: '/Trash',
    icon: <Icon icon="fa-solid:trash" />,
    title: 'Trash',
  }
];

// Applicant Sidebar Items
export const applicantSidebarItems = [
  {
    path: '/myApplications',
    icon: <Icon icon="material-symbols:wysiwyg-rounded" />,
    title: 'My Applications',
  },
  {
    path: '/interviewScheduler',
    icon: <Icon icon="material-symbols:interpreter-mode-outline-rounded" />,
    title: 'Schedule Interview',
  },
  {
    path: '/job/Post/view',
    icon: <Icon icon="ant-design:calendar-filled" />,
    title: 'Job Post',
  },
];

// Additional Sidebar Items
export const additionalSidebarItems = [
  {
    path: '/documents',
    icon: <Icon icon="heroicons:document-20-solid" />,
    title: 'Docs',
  },
  {
    path: '/help',
    icon: <Icon icon="nimbus:globe" />,
    title: 'Help',

  },
  {
    path: '/settings',
    icon: <Icon icon="akar-icons:settings-vertical" />,
    title: 'settings',
  }
];

// Settings Sidebar Items
export const settingsSidebarItems = [
  {
    path: '/Logout',
    icon: <Icon icon="nimbus:arrow-left" />,
    title: 'Logout',
  }
];
