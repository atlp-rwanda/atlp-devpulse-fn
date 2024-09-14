import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleSectionToggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const menuItems = [
    {
      id: 'user',
      icon: 'fluent:people-team-20-filled',
      title: 'User',
      items: [
        { path: "/filter_trainee-applicants", icon: 'fontisto:pie-chart-1', title: "Trainees-Applicants" },
        { path: "/Trainee-applicants/create", icon: 'ic:round-people', title: "Create Trainee" },
        { path: "/dashboard", icon: 'fontisto:pie-chart-1', title: "Dashboard" }
      ]
    },
    {
      id: 'programs',
      icon: 'ic:round-maps-home-work',
      title: 'Programs',
      items: [
        { path: "/programs/list", icon: 'fontisto:pie-chart-1', title: "View Programs" },
        { path: "/programs/create", icon: 'fontisto:pie-chart-1', title: "Create Programs" },
        { path: "/dashboard", icon: 'fontisto:pie-chart-1', title: "Dashboard" }
      ]
    },
    {
      id: 'cohorts',
      icon: 'fa6-solid:graduation-cap',
      title: 'Cohorts',
      items: [
        { path: "/cohorts/list", icon: 'fontisto:pie-chart-1', title: "View Cohorts" },
        { path: "/cohorts/create", icon: 'fontisto:pie-chart-1', title: "Create Cohort" },
        { path: "/dashboard", icon: 'fontisto:pie-chart-1', title: "Dashboard" }
      ]
    },
    {
      id: 'application',
      icon: 'fontisto:pie-chart-1',
      title: 'Application',
      items: [
        { path: "/application/list", icon: 'fontisto:pie-chart-1', title: "View Applications" },
        { path: "/application/create", icon: 'fontisto:pie-chart-1', title: "Create Application" },
        { path: "/dashboard", icon: 'fontisto:pie-chart-1', title: "Dashboard" }
      ]
    },
    {
      id: 'myApplications',
      icon: 'fontisto:pie-chart-1',
      title: 'My Applications',
      items: [
        { path: "/myApplications", icon: 'fontisto:pie-chart-1', title: "My Applications" },
        { path: "/interviewScheduler", icon: 'fontisto:pie-chart-1', title: "Schedule Interview" }
      ]
    },
    {
      id: 'cycle',
      icon: 'game-icons:cycle',
      title: 'Cycle',
      items: [
        { path: "/cycle/list", icon: 'fontisto:pie-chart-1', title: "View Cycle" },
        { path: "/jobapplication/create", icon: 'fontisto:pie-chart-1', title: "Create A Cycle" },
        { path: "/dashboard", icon: 'fontisto:pie-chart-1', title: "Dashboard" }
      ]
    }
  ];

  const footerItems = [
    { path: '/grading', icon: 'bxs:dashboard', title: 'Grading System' },
    { path: '/rolesandaccess', icon: 'heroicons:key-20-solid', title: 'Roles & Access' },
    { path: '/Trash', icon: 'fa-solid:trash', title: 'Trash' },
    
    {
      path: '/documents',
       icon : 'heroicons:document-20-solid',
      title: 'Docs',
    },
    {
      path: '/help',
      icon: 'nimbus:globe',
      title: 'Help',
    },
    { path: '/Logout', icon: 'nimbus:arrow-left', title: 'Logout' },
   
  ];

  return (
    <div className="top-0 bottom-0 overflow-y-hidden mt-[70px] w-[16rem] grow z-10 fixed dark:bg-dark-bg bg-white font-sans border-r border-[#979797]">
      <div className="mb-2 border-b border-[#000]">
        {menuItems.map((section) => (
          <div key={section.id} className="cursor-pointer">
            <div
              className="p-2 font-semibold text-lg flex items-center"
              onClick={() => handleSectionToggle(section.id)}
            >
              <Icon icon={section.icon} className='mr-2 text-white' />
              <div className='text-white'>{section.title}</div>
            </div>
            {expandedSection === section.id && (
              <ul className="pl-4 mt-2">
                {section.items.map((item, index) => (
                  <li key={index} className="min:text-xl text-base">
                    <NavLink
                      to={item.path}
                      className={`text-white p-1 flex align-items-center leading-3 dark:text-white hover:bg-white hover:text-white dark:hover:bg-slate-700 cursor-pointer font-semibold hover:font-bold`}
                    >
                      <label className="mr-3 p-1 cursor-pointer">
                        <Icon icon={item.icon} />
                      </label>
                      <label className="p-1 cursor-pointer">{item.title}</label>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        
      </div>
      <div className="p-2">
          <ul className="pl-4 mt-2">
            {footerItems.map((item, index) => (
              <li key={index} className="min:text-xl text-base">
                <NavLink
                  to={item.path}
                  className={`text-white p-1 flex align-items-center leading-3 dark:text-white hover:bg-white hover:text-white dark:hover:bg-slate-700 cursor-pointer font-semibold hover:font-bold`}
                >
                  <label className="mr-3 p-1 cursor-pointer">
                    <Icon icon={item.icon} />

                  </label>
                  <label className="p-1 cursor-pointer">{item.title}</label>
                </NavLink>
              
                
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default Sidebar;
