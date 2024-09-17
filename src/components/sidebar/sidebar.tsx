import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  generalSectionItems,
  managementSectionItems,
  applicationsSectionItems,
  performanceSectionItems,
  adminSectionItems,
  applicantSidebarItems,
  additionalSidebarItems,
} from './sidebarItems';
import "./navslide.css"

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const roleName = localStorage.getItem('roleName');
  const [openSections, setOpenSections] = useState({
    general: true,
    management: true,
    applications: true,
    performance: true,
    admin: true,
    additional: true,
  });

  const toggleSection = (section) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const sections =
    roleName === 'applicant'
      ? [{ title: 'Applicant Section', items: applicantSidebarItems }]
      : [
          { title: 'General', items: generalSectionItems },
          { title: 'Management', items: managementSectionItems },
          { title: 'Applications', items: applicationsSectionItems },
          { title: 'Performance', items: performanceSectionItems },
          { title: 'Admin', items: adminSectionItems },
        ];

  return (
    <div
      className={`top-0 mt-[70px] ${
        expanded ? 'w-[16rem]' : 'w-[4rem]'
      } fixed z-10 dark:bg-dark-bg bg-white border-r transition-width duration-300 h-screen overflow-y-auto custom-scrollbar`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="p-1.5 rounded-lg bg-gray-50 absolute top-2 right-2 z-20"
      >
        <Icon
          icon={expanded ? 'material-symbols:menu-open' : 'mdi:menu-close'}
          color="#000"
        />
      </button>
      <div className="pt-12 pb-12 mb-20">
        {sections.map((section, idx) => (
          <SidebarSection
            key={idx}
            items={section.items}
            title={section.title}
            expanded={expanded}
            open={openSections[section.title.toLowerCase()]}
            toggle={() => toggleSection(section.title.toLowerCase())}
          />
        ))}
        <SidebarSection
          items={additionalSidebarItems}
          title="Additional"
          expanded={expanded}
          open={openSections.additional}
          toggle={() => toggleSection('additional')}
        />
        <div className="">
        <LogoutLink expanded={expanded} />
      </div>
      </div>

      
    </div>
  );
};

const LogoutLink = ({ expanded }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('roleName');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <ul className="pl-4">
      <li className="flex items-center text-white">
        <button
          onClick={handleLogout}
          className="flex items-center p-1 font-semibold hover:font-bold focus:outline-none"
        >
          <Icon icon="nimbus:arrow-left" className="mr-3" />
          {expanded && <span>Logout</span>}
        </button>
      </li>
    </ul>
  );
};

const SidebarSection = ({ items, title, expanded, open, toggle }) => (
  <div>
    <div
      onClick={toggle}
      className="cursor-pointer p-2 flex items-center justify-between text-white"
    >
      {expanded && <span className="font-bold">{title}</span>}
      <Icon icon={open ? 'akar-icons:chevron-down' : 'akar-icons:chevron-right'} />
    </div>
    {open && (
      <ul className="pl-4 mt-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-white">
            <Link to={item.path} className="p-1 flex items-center">
              <span className="mr-3">{item.icon}</span>
              {expanded && <span>{item.title}</span>}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Sidebar;
