import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import {
  generalSectionItems,
  managementSectionItems,
  applicationsSectionItems,
  performanceSectionItems,
  adminSectionItems,
  applicantSidebarItems,
  additionalSidebarItems,
} from './sidebarItems';

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

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div
      className={`top-0 bottom-0 mt-[70px] ${expanded ? 'w-[16rem]' : 'w-[4rem]'} z-10 fixed dark:bg-dark-bg bg-white text-white font-sans border-r border-[#979797] transition-width duration-300`}
      style={{ height: 'calc(100vh - 70px)' }}
    >
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 rounded-lg bg-gray-50 hover:bg-lime-800 absolute top-2 text-white right-2 z-20"
      >
        <Icon
          icon={expanded ? 'material-symbols:menu-open' : 'mdi:menu-close'}
          color="#000"
        />
      </button>

      <div className="overflow-y-auto pt-12">
        {roleName === 'applicant' ? (
          <SidebarSection
            items={applicantSidebarItems}
            title="Applicant Section"
            expanded={expanded}
            open={openSections.general}
            toggle={() => toggleSection('general')}
          />
        ) : (
          <>
            <SidebarSection
              items={generalSectionItems}
              title="General"
              expanded={expanded}
              open={openSections.general}
              toggle={() => toggleSection('general')}
            />
            <SidebarSection
              items={managementSectionItems}
              title="Management"
              expanded={expanded}
              open={openSections.management}
              toggle={() => toggleSection('management')}
            />
            <SidebarSection
              items={applicationsSectionItems}
              title="Applications and Programs"
              expanded={expanded}
              open={openSections.applications}
              toggle={() => toggleSection('applications')}
            />
            <SidebarSection
              items={performanceSectionItems}
              title="Performance and Grading"
              expanded={expanded}
              open={openSections.performance}
              toggle={() => toggleSection('performance')}
            />
            <SidebarSection
              items={adminSectionItems}
              title="Admin"
              expanded={expanded}
              open={openSections.admin}
              toggle={() => toggleSection('admin')}
            />
          </>
        )}
        <SidebarSection
          items={additionalSidebarItems}
          title="Additional"
          expanded={expanded}
          open={openSections.additional}
          toggle={() => toggleSection('additional')}
        />

        {/* Logout section */}
        <div className="mt-6 p-4">
          <ul className="pl-4">
            <li className="flex items-center text-white text-base dark:text-white">
              <Link
                to="/Logout"
                className="is-active focus:text-green-600 p-1 flex items-center leading-3 cursor-pointer font-semibold hover:font-bold"
              >
                <span className="mr-3 p-1">
                  <Icon icon="nimbus:arrow-left" />
                </span>
                {expanded && <span className="p-1">Logout</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const SidebarSection = ({ items, title, expanded, open, toggle }) => (
  <div>
    <div
      onClick={toggle}
      className="cursor-pointer flex items-center justify-between p-2 text-white hover:bg-green"
    >
      {expanded && <span className="font-bold">{title}</span>}
      <Icon icon={open ? 'akar-icons:chevron-down' : 'akar-icons:chevron-right'} />
    </div>
    {open && (
      <ul className="pl-4 mt-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center text-white text-base dark:text-white"
          >
            <Link
              to={item.path}
              className="is-active focus:text-green-600 p-1 flex items-center leading-3 cursor-pointer font-semibold hover:font-bold"
            >
              <span className="mr-3 p-1">{item.icon}</span>
              {expanded && <span className="p-1">{item.title}</span>}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Sidebar;
