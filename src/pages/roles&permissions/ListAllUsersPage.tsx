import { useState, useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";
import { useAppDispatch } from "../../hooks/hooks";
import ListAllUsers from "../../components/roles&permissions/ListAllUsers";
import NavBar from "../../components/sidebar/navHeader";
import { getAllMembers } from "../../redux/actions/users";
import { getRoles } from "../../redux/actions/roles";
import * as AiIcons from "react-icons/ai";
import {
  DOTS,
  useCustomPagination,
} from "../../components/Pagination/useCustomPagination";

interface User {
  id: string;
  email: string;
  isActive: boolean;
  firstname: string;
  lastname: string;
  picture: string;
  role: {
    roleName: string;
    description: string;
    _id: string;
  };
  permissions: [];
}

type MemberC = User[];

const ListAllUsersPage: FunctionComponent = (props: any) => {
  const [member, setmembers] = useState(null);
  const [underline, setunderline] = useState("All");
  const [filteredMembers, setFilteredMembers] = useState<MemberC>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [membersPerPage] = useState(6);
  const [moredrp, setmoredrp] = useState(false);
  const indexOfLastMember = (currentPage + 1) * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const dispatch = useAppDispatch();
  const { members, roles } = props;

  useEffect(() => {
    dispatch(getAllMembers());
    dispatch(getRoles());
  }, [member]);

  const rolesArrange = roles?.message;
  const currentMembers =
    filteredMembers.length !== 0
      ? filteredMembers.slice(indexOfFirstMember, indexOfLastMember)
      : members?.message?.getUsers_Logged.slice(
          indexOfFirstMember,
          indexOfLastMember
        );
  const searchFilter = members?.message?.getUsers_Logged;

  const previousPage = () => {
    if (currentPage + 1 !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (
      currentPage + 1 !==
      Math.ceil(members?.message?.getUsers_Logged.length / membersPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginationRange = useCustomPagination({
    totalPageCount: Math.ceil(
      filteredMembers.length !== 0
        ? filteredMembers.length / 6
        : members?.message?.getUsers_Logged.length / 6
    ),
    currentPage,
  });

  const memberFiltering = (role) => {
    const results =
      role === "All"
        ? members?.message?.getUsers_Logged
        : role === "Active" || role === "Inactive"
        ? members?.message?.getUsers_Logged.filter((item: any) => {
            let status: boolean;
            role === "Inactive" ? (status = false) : (status = true);
            return (
              item && `${item?.isActive}` && `${item?.isActive}` === `${status}`
            );
          })
        : members?.message?.getUsers_Logged.filter((item: any) => {
            return (
              item &&
              item?.role &&
              item?.role?.roleName &&
              item?.role?.roleName.toLowerCase() === role.toLowerCase()
            );
          });

    const index1 = rolesArrange.findIndex((item) => {
      return item.roleName.toLowerCase() === role.toLowerCase();
    });

    if (index1 > 2) {
      const element = rolesArrange.splice(index1, 1)[0];
      rolesArrange.splice(0, 0, element);
    }
    setunderline(role);
    setFilteredMembers(results);
  };

  const updateMembers = (data, id) => {
    if (data === "add member") {
      if (filteredMembers.length !== 0) {
        setFilteredMembers((current) => [id, ...current]);
        return;
      }
    }

    const updatedMembers = filteredMembers.map((member: any, index) => {
      if (
        data !== "delete" &&
        data?.data?.assignRoleToUser === undefined &&
        member.id === id
      ) {
        member.isActive = data?.data?.data?.updateUserStatus;
      } else if (
        data !== "delete" &&
        data?.data?.assignRoleToUser !== undefined &&
        member.id === id
      ) {
        member.role = data?.data?.assignRoleToUser.role;
      } else if (data === "delete" && member.id === id) {
        filteredMembers.splice(index, 1);
        return;
      }
      return member;
    });

    setFilteredMembers(updatedMembers);
  };

  const handleRemoveMember = (id: any) => {
    if (filteredMembers.length !== 0) {
      filteredMembers.map((member: any, index) => {
        if (member.id === id) {
          filteredMembers.splice(index, 1);
          setFilteredMembers(filteredMembers);
        }
      });
    }
  };

  return (
    <>
      <div className="dark:bg-dark-frame-bg w-full h-screen">
        <div className=" dark:bg-dark-frame-bg semi-md:px-[30px] semi-md:py-[10px]">
          <div>
            <div>
              <ul className=" flex dark:text-white semi-md:space-x-5 p-5 px-0 text-sm semi-md:flex-row sm:flex-col ">
                <li
                  className={` ${
                    underline === "All"
                      ? "underline underline-offset-8 decoration-green"
                      : ""
                  } cursor-pointer`}
                  onClick={() => memberFiltering("All")}
                >
                  All
                </li>
                {roles?.message !== null &&
                  rolesArrange?.map(
                    (role: any, index) =>
                      index <= 2 && (
                        <li
                          key={index}
                          className={` ${
                            underline === role.roleName
                              ? "underline underline-offset-8 decoration-green"
                              : ""
                          } cursor-pointer`}
                          onClick={() => memberFiltering(role.roleName)}
                        >
                          {role.roleName}
                        </li>
                      )
                  )}
                {roles.message !== null && roles.message.length > 3 && (
                  <li className=" underline underline-offset-8 decoration-sky-500 pt-1 cursor-pointer">
                    <div
                      onClick={() => {
                        setmoredrp(!moredrp);
                      }}
                    >
                      {moredrp ? (
                        <AiIcons.AiOutlineUp />
                      ) : (
                        <AiIcons.AiOutlineDown />
                      )}
                    </div>
                    <div className="relative">
                      <div
                        className={`${
                          moredrp === true ? "block" : "hidden"
                        } absolute w-[100%] h-screen bg-white dark:bg-dark-tertiary  dark:text-white text-base z-20 list-none divide-y divide-gray-100 rounded shadow my-4`}
                        id="dropdown"
                      >
                        <ul className="py-1" aria-labelledby="dropdown">
                          {roles?.message !== null &&
                            rolesArrange?.map(
                              (role: any, index) =>
                                index > 2 && (
                                  <li
                                    key={index}
                                    className={` ${
                                      underline === role.roleName
                                        ? "underline underline-offset-8 decoration-green"
                                        : ""
                                    } text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2 cursor-pointer`}
                                    onClick={() =>
                                      memberFiltering(role.roleName)
                                    }
                                  >
                                    {role.roleName}
                                  </li>
                                )
                            )}
                          <li>
                            <div
                              className={` ${
                                underline === "Active"
                                  ? "underline underline-offset-8 decoration-green"
                                  : ""
                              } text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2 cursor-pointer`}
                              onClick={(e: any) => {
                                e.preventDefault();
                                memberFiltering("Active");
                              }}
                            >
                              Active
                            </div>
                          </li>
                          <li>
                            <div
                              className={` ${
                                underline === "Inactive"
                                  ? "underline underline-offset-8 decoration-green"
                                  : ""
                              } text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2 cursor-pointer`}
                              onClick={(e: any) => {
                                e.preventDefault();
                                memberFiltering("Inactive");
                              }}
                            >
                              Inactive
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <ListAllUsers
            members={currentMembers}
            roles={roles}
            searchFilter={searchFilter}
            updateMember={updateMembers}
            handleRemove={handleRemoveMember}
          />
          <div
            className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between rounded-b-md py-8  dark:bg-dark-bg"
            aria-label="Pagination"
          >
            <div
              className="relative z-0 inline-flex items-center ml-auto mr-auto  rounded-[2px] shadow-sm space-x-2"
              aria-label="Pagination"
            >
              <button
                className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8] dark:disabled:bg-[#485970]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100"
                onClick={() => setCurrentPage(0)}
                disabled={currentPage <= 0}
              >
                <AiIcons.AiOutlineDoubleLeft />
              </button>
              <button
                className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100 dark:disabled:bg-[#485970]"
                onClick={() => previousPage()}
                disabled={currentPage <= 0}
              >
                <AiIcons.AiOutlineLeft />
              </button>
              {paginationRange?.map((pageNumber, idx) => {
                if (pageNumber === DOTS) {
                  return (
                    <div key={idx} className="dark:text-zinc-100 md:hidden">
                      ...
                    </div>
                  );
                }

                if (pageNumber - 1 === currentPage) {
                  return (
                    <button
                      key={idx}
                      className={`border-solid border-[1px] cursor-pointer border-[#a8a8a8] bg-[#fff] min-w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 rounded-[2px] md:hidden
                        ${currentPage && "bg-[#d6dfdf] text-black"} 
                        ${currentPage === 0 && "bg-[#d6dfdf] text-black"} 
                          `}
                      onClick={() => paginate(pageNumber - 1)}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                return (
                  <button
                    key={idx}
                    className={`border-solid border-[1px]  cursor-pointer border-[#a8a8a8] bg-[#fff] min-w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 rounded-[2px] md:hidden`}
                    onClick={() => paginate(pageNumber - 1)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                onClick={() => nextPage()}
                disabled={
                  currentPage >=
                  Math.ceil(
                    members?.message?.getUsers_Logged.length / membersPerPage
                  ) -
                    1
                }
              >
                <AiIcons.AiOutlineRight />
              </button>
              <button
                className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                onClick={() =>
                  setCurrentPage(
                    Math.ceil(
                      members?.message?.getUsers_Logged.length / membersPerPage
                    ) - 1
                  )
                }
                disabled={
                  currentPage >=
                  Math.ceil(
                    members?.message?.getUsers_Logged.length / membersPerPage
                  ) -
                    1
                }
              >
                <AiIcons.AiOutlineDoubleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = (state: any) => ({
  members: state.members,
  roles: state.roles,
});

export default connect(mapState, {
  getAllMembers,
  getRoles,
})(ListAllUsersPage);
