import React, { useEffect, useMemo, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Column, usePagination, useTable } from "react-table";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import NavBar from "../../components/sidebar/navHeader";
import { useForm } from "react-hook-form";
import {
  RolePermission,
  roleSchema,
} from "../../components/validation/Register";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../redux/actions/axiosconfig";
import { toast } from "react-toastify";
import UserEntity from "../../components/roles&permissions/UserEntity";
import ApplicationEntity from "../../components/roles&permissions/ApplicationEntity";
import CohortEntity from "../../components/roles&permissions/CohortEntity";
import RoleEntity from "../../components/roles&permissions/RoleEntity";

export interface SingleRole {
  _id?: string;
  roleName?: string;
  description?: string;
  permissions?: Permission[];
}
export type Permission = {
  create: boolean;
  deleteMultiple: boolean;
  deleteOne: boolean;
  deleteOwn: boolean;
  entity: string;
  updateMultiple: boolean;
  updateOne: boolean;
  updateOwn: boolean;
  viewMultiple: boolean;
  viewOne: boolean;
  viewOwn: boolean;
  _id?: string;
};

function RolePermission(props: any) {
  const token = localStorage.getItem("access_token");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RolePermission>({
    resolver: zodResolver(roleSchema),
  });
  const showToast = (message: any, type: any) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };
  const [getRoleId, setGetRoleId] = useState<string | null>(null);
  const [updateRoleId, setUpdateRoleId] = useState<string | null>(null);
  const [isViewingSingleRole, setIsViewSingleRole] = useState(false);
  const [isSingleRole, setIsSingleRole] = useState(false);
  const [singleRoleData, setSingleRoleData] = useState<
    SingleRole | null | undefined
  >({
    roleName: "",
    description: "",
    permissions: [],
  });

  const [currentDropdownIndex, setCurrentDropdownIndex] = useState<
    number | null
  >(null);
  const [updatePermissionData, setUpdatePermissionData] = useState({
    create: false,
    deleteMultiple: false,
    deleteOne: false,
    deleteOwn: false,
    entity: "",
    updateMultiple: false,
    updateOne: false,
    updateOwn: false,
    viewMultiple: false,
    viewOne: false,
    viewOwn: false,
  });
  const [openUpdateModal, setOpenUpdateModel] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null);
  const [userOpen, setUserOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [openCohort, setOpenCohort] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [isAnError, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<SingleRole[]>([]);
  const [userPermissions, setUserPermissions] = useState<any>([]);
  const [appPermissions, setAppPermissions] = useState<any>([]);
  const [cohortPermissions, setCohortPermissions] = useState<any>([]);
  const [rolePermissions, setRolePermissions] = useState<any>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [userSelectedEntity, setUserSelectedEntity] = useState("");
  const [appSelectedEntity, setAppSelectedEntity] = useState("");
  const [selectedCohortEntity, setSelectedCohortEntity] = useState("");
  const [selectedRoleEntity, setSelectedRoleEntity] = useState("");
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [openEntities, setOpenEntities] = useState<string[]>([]);

  const toggleEntityPermissions = (entity: string) => {
    setOpenEntities((prevOpenEntities) =>
      prevOpenEntities.includes(entity)
        ? prevOpenEntities.filter((e) => e !== entity)
        : [...prevOpenEntities, entity]
    );
  };

  const handleEntityChange = (index, newEntity) => {
    const updatedPermissions = (singleRoleData?.permissions || []).map(
      (permission, idx) => {
        if (idx === index) {
          return { ...permission, entity: newEntity };
        }
        return permission;
      }
    );

    setSingleRoleData({
      ...singleRoleData,
      permissions: updatedPermissions,
    });
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const finalPermission = [
      {
        entity: userSelectedEntity,
        permissions: userPermissions,
      },
      {
        entity: appSelectedEntity,
        permissions: appPermissions,
      },
      {
        entity: selectedCohortEntity,
        permissions: cohortPermissions,
      },
      {
        entity: selectedRoleEntity,
        permissions: rolePermissions,
      },
    ];
    const filteredPermissions = finalPermission.filter(
      (item) => item.entity !== undefined && item.entity !== ""
    );

    try {
      const parsedData = roleSchema.parse(data);
      const response = await axios.post("/", {
        query: `
        mutation CreateRole($input: CreateRoleInput!) {
          createRole(input: $input) {
            _id
            roleName
            description
            permissions {
              entity
              _id
              create
              viewOwn
              viewMultiple
              viewOne
              updateOwn
              updateMultiple
              updateOne
              deleteOwn
              deleteMultiple
              deleteOne
            }
          }
        }
        `,
        variables: {
          input: {
            roleName: parsedData.Name,
            description: parsedData.Description,
            permissions: filteredPermissions,
          },
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.data.errors) {
        toast.error(response.data.errors[0].message);
        setIsLoading(false);
      } else {
        const successMessage =
          response.data.message || "Role created successfully";
        toast.success(successMessage);
        const newRole = {
          roleName: parsedData.Name,
          description: parsedData.Description,
        };
        setRoles((prevRoles) => [...prevRoles, newRole]);
        handleCloseCreateModel();
      }
    } catch (error: any) {
      showToast(error, "error");
      toast.error(error.message);
    }
    setIsLoading(false);
  };
  const handleCloseUpdateModal = (e: any) => {
    e.preventDefault();
    setOpenUpdateModel(false);
  };
  const handleCloseCreateModel = () => {
    setOpenCreateModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleOpenUpdateModal = async () => {
    setOpenUpdateModel(true);
    setIsEditable(true);
  };
  const handleOpenCreateRole = () => {
    setOpenCreateModal(true);
  };
  const handleOpenDeleteRole = (roleId: any) => {
    setDeleteRoleId(roleId);
    setOpenDeleteModal(true);
  };
  const handleDeleteRole = async () => {
    if (!deleteRoleId) return;
    setAnchorEl(null);
    try {
      const response = await axios.post("/", {
        query: `
        mutation DeleteRole($deleteRoleId: ID!) {
          deleteRole(id: $deleteRoleId)
        }
        `,
        variables: {
          deleteRoleId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.data.data.deleteRole) {
        toast.success("Role deleted successfully");
        setRoles((prevRoles) => {
          const newRoles = prevRoles.filter(
            (role: any) => role.id !== deleteRoleId
          );
          return newRoles;
        });
        setOpenDeleteModal(false);
      } else {
        toast.error("Failed to delete role");
      }
    } catch (error: any) {
      showToast(error, "error");
    }
  };
  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await axios.post("/", {
          query: `
          query GetAllRoles {
            getAllRoles {
              _id
              roleName
              description
              permissions {
                entity
                _id
                create
                viewOwn
                viewMultiple
                viewOne
                updateOwn
                updateMultiple
                updateOne
                deleteOwn
                deleteMultiple
                deleteOne
              }
            }
          }
          `,
        });
        setRoles(response.data.data.getAllRoles);
      } catch (err) {
        console.log(err);
      }
    };
    getRoles();
  }, []);
  const handleIconClick = (event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
    if (event.currentTarget) {
      setMenuPosition({
        top: event.clientY - 4,
        left: event.clientX - 4,
      });
      setAnchorEl(event.currentTarget as unknown as HTMLElement);
    }
  };

  const handleAddPermission = () => {
    if (currentDropdownIndex === null) {
      setCurrentDropdownIndex(0);
    } else {
      const nextDropdownIndex = (currentDropdownIndex + 1) % 4;
      setCurrentDropdownIndex(nextDropdownIndex);
    }
  };

  const handleInputChange = (e) => {
    setSingleRoleData({
      ...singleRoleData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePermissionChange = (entity, field, checked) => {
    setUpdatePermissionData((prevState) => ({
      ...prevState,
      [entity]: {
        ...prevState[entity],
        [field]: checked,
      },
    }));
  };

  const handleViewUpdateRole = async (getRoleId) => {
    try {
      if (!getRoleId) {
        console.error("Role ID is null");
        return;
      }
      console.log("Role ID is", getRoleId);
      setAnchorEl(null);
      setGetRoleId(getRoleId);
      const response = await axios.post("/", {
        query: `
        query GetRole($getRoleId: ID!) {
          getRole(id: $getRoleId) {
            _id
            roleName
            description
            permissions {
              entity
              _id
              create
              viewOwn
              viewMultiple
              viewOne
              updateOwn
              updateMultiple
              updateOne
              deleteOwn
              deleteMultiple
              deleteOne
            }
          }
        }
      `,
        variables: {
          getRoleId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const role = response.data.data.getRole;
      setSingleRoleData(role);
      setOpenUpdateModel(true);
      setIsSingleRole(true);

      const formattedPermissions = role.permissions.reduce((acc, perm) => {
        acc[perm.entity] = perm;
        return acc;
      }, {});

      setUpdatePermissionData(formattedPermissions);
    } catch (error) {
      console.error("Error viewing role:", error);
    }
  };

  const handleViewSingleRole = async (getRoleId) => {
    try {
      if (!getRoleId) {
        console.error("Role ID is null");
        return;
      }
      console.log("Role ID is", getRoleId);
      setAnchorEl(null);
      setGetRoleId(getRoleId);
      const response = await axios.post("/", {
        query: `
          query GetRole($getRoleId: ID!) {
            getRole(id: $getRoleId) {
              _id
              roleName
              description
              permissions {
                entity
                _id
                create
                viewOwn
                viewMultiple
                viewOne
                updateOwn
                updateMultiple
                updateOne
                deleteOwn
                deleteMultiple
                deleteOne
              }
            }
          }
        `,
        variables: {
          getRoleId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const role = response.data.data.getRole;
      setSingleRoleData(role);
      setIsSingleRole(true);
      setIsViewSingleRole(true);
    } catch (error) {
      console.error("Error viewing role:", error);
    }
  };

  const handleBack = () => {
    setIsSingleRole(false);
    setSingleRoleData(null);
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      if (!getRoleId) {
        console.error("Role ID is null");
        return;
      }

      const permissionsToUpdate = Object.keys(updatePermissionData).map(
        (entity) => ({
          entity,
          permissions: Object.keys(updatePermissionData[entity])
            .filter((key) => updatePermissionData[entity][key] === true)
            .map((key) => key),
        })
      );

      const updatedData = {
        roleName: singleRoleData?.roleName,
        description: singleRoleData?.description,
        permissions: permissionsToUpdate,
      };

      const response = await axios.post("/", {
        query: `
          mutation UpdateRole($updateRoleId: ID!, $input: UpdateRoleInput!) {
            updateRole(id: $updateRoleId, input: $input) {
              _id
              roleName
              description
              permissions {
                entity
                _id
                create
                viewOwn
                viewMultiple
                viewOne
                updateOwn
                updateMultiple
                updateOne
                deleteOwn
                deleteMultiple
                deleteOne
              }
            }
          }
        `,
        variables: {
          updateRoleId: getRoleId,
          input: {
            roleName: updatedData?.roleName,
            description: updatedData?.description,
            permissions: updatedData?.permissions,
          },
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const updatedRole = response.data.data.updateRole;

      setRoles((prevRoles) =>
        prevRoles.map((role) => (role._id === getRoleId ? updatedRole : role))
      );

      setOpenUpdateModel(false);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const COLS: Column<SingleRole>[] = [
    {
      Header: "Role Name",
      accessor: "roleName",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Action",
      Cell: ({ row }: any) => (
        <div>
          <BsIcons.BsThreeDotsVertical
            className=" text-black relative dark:text-white text-3xl cursor-pointer"
            onClick={handleIconClick}
          />
        </div>
      ),
    },
  ];

  const columns = useMemo(() => COLS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  }: any = useTable(
    {
      columns,
      data: roles.sort((a: any, b: any) =>
        a.roleName.localeCompare(b.roleName)
      ),
    },
    usePagination
  );
  const { pageIndex, pageSize } = state;
  const userEntities = ["Users", "Applications", "Cohorts", "Roles"];
  let appEntities = ["Users", "Applications", "Cohorts", "Roles"];
  let cohortEntities = ["Users", "Applications", "Cohorts", "Roles"];
  let roleEntities = ["Users", "Applications", "Cohorts", "Roles"];

  if (appEntities.includes(userSelectedEntity)) {
    appEntities = userEntities.filter((ent) => ent !== userSelectedEntity);
  }
  if (cohortEntities.includes(appSelectedEntity)) {
    cohortEntities = appEntities.filter((ent) => ent !== appSelectedEntity);
  }

  if (roleEntities.includes(selectedCohortEntity)) {
    roleEntities = cohortEntities.filter((ent) => ent !== selectedCohortEntity);
  }

  return (
    <>
      <NavBar />
      <div className="flex dark:bg-dark-bg dark:text-white bg-[#F9F9FB] min-h-[100vh]">
        <div className="min-h-[50vh] w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem]  pt-[80px] md:pl-0">
          <div className=" table table-fixed w-[100%] top-[20%] md:top-[10%] pb-10 md:relative px-[5%] md:px-[10px]">
            <button
              className="h-[40px] rounded-[5px]  dark:bg-[#56C870] bg-[#173b3f] text-white flex items-center p-0 pl-[5px] pr-[10px] mb-[20px]"
              onClick={() => handleOpenCreateRole()}
              style={{ display: isSingleRole ? "none" : "block" }}
            >
              <span>Add new Role</span>
            </button>
            <div>
              <div className=" w-[100%] dark:bg-dark-bg max-h-[70vh] m-auto  bg-[#fff] shadow-md rounded-[10px] relative pb-[20px]  overflow-x-auto  overflow-y-scroll 	md:w-[100%] p-10">
                {isSingleRole && singleRoleData ? (
                  <div className="w-full">
                    <div>
                      <button
                        className="h-[40px] w-28 rounded-[5px]  dark:bg-[#56C870] bg-[#173b3f] text-white "
                        onClick={handleBack}
                      >
                        <span className="">Back</span>
                      </button>
                    </div>
                    <div className="mt-8">
                      <h2 className="text-2xl font-bold">
                        {singleRoleData.roleName}
                      </h2>
                      <h1>{singleRoleData.description}</h1>
                    </div>
                    <div className="mt-5">
                      {singleRoleData.permissions?.map((permission, index) => (
                        <div>
                          <div className="">
                            <h2 key={index} className="text-white text-lg">
                              {permission.entity}
                            </h2>
                          </div>
                          <div className="flex gap-x-2 md:flex-col">
                            <div>
                              <label
                                htmlFor="create"
                                className=" block text-sm"
                              >
                                Create
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.create}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="deleteMultiple"
                                className=" block text-sm"
                              >
                                deleteMultiple
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.deleteMultiple}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="deleteOne"
                                className=" block text-sm"
                              >
                                deleteOne
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.deleteOne}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="deleteOwn"
                                className=" block text-sm"
                              >
                                deleteOwn
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.deleteOwn}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="updateOne"
                                className=" block text-sm"
                              >
                                updateOne
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.updateOne}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="updateOwn"
                                className=" block text-sm"
                              >
                                updateOwn
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.updateOwn}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="updateMultiple"
                                className=" block text-sm"
                              >
                                updateMultiple
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.updateMultiple}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="viewOwn"
                                className=" block text-sm"
                              >
                                viewOwn
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.viewOwn}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="viewOne"
                                className=" block text-sm"
                              >
                                viewOne
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.viewOne}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="viewMultiple"
                                className=" block text-sm"
                              >
                                viewMultiple
                              </label>
                              <input
                                type="checkbox"
                                checked={permission.viewMultiple}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <table
                    {...getTableProps()}
                    className="border-collapse w-[100%] m-auto rounded-[15px] whitespace-nowrap "
                  >
                    <thead className=" w-full px-32 sticky top-0">
                      {headerGroups.map((headerGroup: any, index: number) => (
                        <tr
                          key={index}
                          {...headerGroup.getHeaderGroupProps()}
                          className="border-solid border-[1px] border-white dark:border-dark-tertiary even:bg-[#eef1f1] first:w-[20px]"
                        >
                          {headerGroup.headers.map(
                            (column: any, index: number) => (
                              <th
                                key={index}
                                {...column.getHeaderProps}
                                className="border-solid pl-[30px] h-[50px] text-left dark:bg-dark-tertiary bg-[#eef1f1]  first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] dark:border-dark-tertiary py-6   last:pl-[0px] w-[150px] last:w-[20px]  first:w-[20px]  "
                              >
                                {column.render("Header")}
                              </th>
                            )
                          )}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.reverse().map((row: any) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            className="border-b dark:border-dark-tertiary border-gray-200 "
                            key={row.original._id}
                            onClick={() => {
                              setDeleteRoleId(row.original._id);
                              setGetRoleId(row.original._id);
                              setUpdateRoleId(row.original._id);
                            }}
                          >
                            {row.cells.map((cell: any) => (
                              <td
                                {...cell.getCellProps()}
                                className="pl-[30px] text-left max-w-[150px] overflow-x-auto p-4 last:w-[2px] last:pl-[0px]"
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div className="block mx-auto my-0 w-[100%]  bottom-0 overflow-x-auto">
              <div className="w-[100%] flex items-center justify-center my-[30px]  mx-auto md:block md:mx-auto">
                <span className="flex items-center md:justify-center md:mt-[10px]">
                  <button
                    className="my-0 mx-[5px] px-[5px] py-0 dark:border-dark-tertiary dark:bg-dark-bg dark:text-white text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
                    disabled={!canPreviousPage}
                    onClick={() => gotoPage(0)}
                  >
                    <AiIcons.AiOutlineDoubleLeft />
                  </button>
                  <button
                    className=" border-solid border-[1px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] "
                    disabled={!canPreviousPage}
                    onClick={() => previousPage()}
                  >
                    <AiIcons.AiOutlineLeft />
                  </button>
                  <span className="flex flex-wrap md:hidden " id="pages">
                    {pageOptions?.map((pageOption: any, i: number) => (
                      <div>
                        <button
                          className={`border-solid border-[1px] mx-[2px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white  border-[#a8a8a8] bg-[#fff] w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 ${
                            pageIndex === i && "bg-[#eef1f1]"
                          }`}
                          onClick={(e: any) => {
                            const pageNumber = e.target.innerText;
                            gotoPage(pageNumber - 1);
                          }}
                        >
                          {pageOption + 1}
                        </button>
                      </div>
                    ))}
                  </span>
                  <button
                    className=" border-solid border-[1px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
                    disabled={!canNextPage}
                    onClick={() => nextPage()}
                  >
                    <AiIcons.AiOutlineRight />
                  </button>
                  <button
                    className="my-0 mx-[5px] px-[5px] py-0 dark:border-dark-tertiary dark:bg-dark-bg dark:text-white text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
                    disabled={!canNextPage}
                    onClick={() => gotoPage(pageCount - 1)}
                  >
                    <AiIcons.AiOutlineDoubleRight />
                  </button>
                </span>{" "}
                <span className="flex ml-3 md:justify-center  text-center md:mt-3 md:ml-0">
                  Page <strong>{pageIndex + 1} </strong>
                  of <strong>{pageOptions.length}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
        {menuPosition != null && (
          <Menu
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorEl={anchorEl}
            anchorPosition={menuPosition}
            anchorReference="anchorPosition"
            onClose={handleClose}
            open={open}
          >
            <MenuItem onClick={() => handleViewUpdateRole(getRoleId)}>
              <BsIcons.BsPencilFill className="mr-[5px]" />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleOpenDeleteRole(deleteRoleId)}>
              <BsIcons.BsFillTrashFill className="mr-[5px]" />
              Delete
            </MenuItem>
            <MenuItem onClick={() => handleViewSingleRole(getRoleId)}>
              <AiIcons.AiOutlineEye className="mr-[5px]" />
              View Single Role
            </MenuItem>
          </Menu>
        )}
        <Modal
          aria-describedby="parent-modal-description"
          aria-labelledby="parent-modal-title"
          onClose={handleCloseCreateModel}
          open={openCreateModal}
        >
          <Box className="absolute w-[65%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[90%] overflow-y-scroll ">
            <form
              action=""
              className="relative w-[100%] rounded-[5px] h-[650px] m-auto p-[10px] pt-[5px] dark:bg-dark-bg bg-[#f0f0f0]"
              onSubmit={(event) => {
                handleSubmit(onSubmit)(event);
              }}
            >
              <h1 className="text-center font-bold dark:text-white text-[22px] m-[20px]">
                {isEditable ? "Edit a role" : "Add a role"}
              </h1>
              <IoIcons.IoClose
                className="absolute top-[20px] right-[20px] text-[35px] cursor-pointer dark:text-white"
                onClick={handleCloseCreateModel}
              />
              <hr style={{ marginBottom: "4px" }} />
              <div>
                <label className="mr-3 p-14 dark:text-white font-bold text-[19px]">
                  Name
                </label>
                <input
                  placeholder="Name"
                  type="text"
                  {...register("Name")}
                  className=" mt-2 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px] md:w-[90%]"
                />
                {errors.Name != null && (
                  <p className="text-red-500 text-sm text-center mt-1">
                    {errors.Name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mr-3 p-14 dark:text-white font-bold text-[19px]">
                  Description
                </label>
                <input
                  type="text"
                  {...register("Description")}
                  className=" mt-2 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px] md:w-[90%]"
                  placeholder="Description"
                />
                {errors.Description != null && (
                  <p className="text-red-500 text-sm text-center mt-1">
                    {errors.Description.message}
                  </p>
                )}
              </div>
              <div
                className="text-white h-[40px] block cursor-pointer border-[1px] border-[#a8a8a8] dark:bg-[#56C870] w-[140px] ml-20 rounded-[5px] my-[10px] mx-[auto] text-center bg-[#173b3f] p-0 pl-[5px] pr-[10px] mb-[10px]"
                onClick={handleAddPermission}
              >
                <span className="">Add Pemission</span>
              </div>
              <div className="w-full flex">
                {currentDropdownIndex !== null && (
                  <div>
                    {currentDropdownIndex === 0 && (
                      <UserEntity
                        userSelectedEntity={userSelectedEntity}
                        setUserSelectedEntity={setUserSelectedEntity}
                        setUserOpen={setUserOpen}
                        userEntities={userEntities}
                        userOpen={userOpen}
                        setUserPermissions={setUserPermissions}
                        className=""
                      />
                    )}
                    {currentDropdownIndex === 1 && (
                      <ApplicationEntity
                        appSelectedEntity={appSelectedEntity}
                        setAppSelectedEntity={setAppSelectedEntity}
                        setAppOpen={setAppOpen}
                        appEntities={appEntities}
                        appOpen={appOpen}
                        setAppPermissions={setAppPermissions}
                        className=""
                      />
                    )}
                    {currentDropdownIndex === 2 && (
                      <CohortEntity
                        selectedCohortEntity={selectedCohortEntity}
                        setSelectedCohortEntity={setSelectedCohortEntity}
                        setOpenCohort={setOpenCohort}
                        cohortEntities={cohortEntities}
                        openCohort={openCohort}
                        setCohortPermissions={setCohortPermissions}
                        className=""
                      />
                    )}
                    {currentDropdownIndex === 3 && (
                      <RoleEntity
                        selectedRoleEntity={selectedRoleEntity}
                        setSelectedRoleEntity={setSelectedRoleEntity}
                        setOpenRole={setOpenRole}
                        roleEntities={roleEntities}
                        openRole={openRole}
                        setRolePermissions={setRolePermissions}
                        className=""
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="">
                {isLoading ? (
                  <button
                    className="text-white border-[1px] border-[#a8a8a8] dark:bg-[#56C870] h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-[auto] bg-[#173b3f]"
                    disabled
                    type="submit"
                  >
                    <svg
                      className="inline mr-3 w-4 h-4 text-white animate-spin "
                      fill="none"
                      role="status"
                      viewBox="0 0 100 101"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#56C870"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    className="text-white border-[1px] border-[#a8a8a8] dark:bg-[#56C870] h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-[auto] bg-[#173b3f]"
                    type="submit"
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </Box>
        </Modal>
        <Modal
          aria-describedby="parent-modal-description"
          aria-labelledby="parent-modal-title"
          onClose={handleCloseDeleteModal}
          open={openDeleteModal}
        >
          <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[5px] dark:bg-dark-bg bg-[#f0f0f0]">
            <div className="block w-[300px] h-[200px] dark:bg-dark-bg dark:text-white bg-[#f0f0f0] rounded-[5px]">
              <div className="text-center">
                <AiIcons.AiFillExclamationCircle className="w-[40px] my-[20px] mx-auto text-[40px]" />
                <p className="w-[60%] m-auto font-bold">
                  Are you sure you want to delete this Role?
                </p>
              </div>
              <div className="flex flex-wrap my-[20px] mx-0">
                <button
                  onClick={handleDeleteRole}
                  className="block text-white bg-[#940000] my-[10px] mx-auto rounded-[5px] w-[100px] h-[40px]"
                >
                  Delete
                </button>
                <button className="h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-auto bg-[#ABB8C3] text-[#fff]">
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          aria-describedby="parent-modal-description"
          aria-labelledby="parent-modal-title"
          onClose={handleCloseUpdateModal}
          open={openUpdateModal}
        >
          <div>
            <Box className="absolute w-[70%] h-[80%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[90%]">
              <form className="relative rounded-[5px] w-[100%] h-[100%] m-auto p-[10px] pt-[5px] dark:bg-dark-bg bg-[#f0f0f0] overflow-y-auto">
                <h1 className="text-center dark:text-white font-bold text-[24px] m-[20px]">
                  Update Role
                </h1>
                <IoIcons.IoClose
                  onClick={handleCloseUpdateModal}
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "35px",
                    cursor: "pointer",
                  }}
                />
                <hr style={{ marginBottom: "40px" }} />

                <label
                  htmlFor="roleName"
                  className="dark:text-white text-[24px] font-semibold ml-[10%] block"
                >
                  Role Name
                </label>
                <input
                  className="mt-1 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[10px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8] px-[10px] md:w-[90%]"
                  name="roleName"
                  type="text"
                  value={singleRoleData?.roleName}
                  onChange={handleInputChange}
                />

                <label
                  htmlFor="description"
                  className="dark:text-white text-[24px] font-semibold ml-[10%] block"
                >
                  Description
                </label>
                <input
                  className="mt-1 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[10px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8] px-[10px] md:w-[90%]"
                  name="description"
                  type="text"
                  value={singleRoleData?.description}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="roleName"
                  className="dark:text-white text-[24px] font-semibold ml-[10%] block"
                >
                  Permissions
                </label>
                <div className="modal-body ml-[10%]  w-[80%] flex flex-col bg-lime">
                  {singleRoleData?.permissions?.map((permission, index) => {
                    const isOpen = openEntities.includes(permission.entity);

                    return (
                      <div key={index}>
                        <div className="p-2 flex justify-between items-center">
                          <select
                            value={permission.entity}
                            onChange={(e) =>
                              handleEntityChange(index, e.target.value)
                            }
                            className="bg-white text-lg font-semibold p-2 rounded-lg"
                          >
                            <option value="">Select Entity</option>
                            {roleEntities.map((entity, idx) => (
                              <option key={idx} value={entity}>
                                {entity}
                              </option>
                            ))}
                          </select>

                          <BsIcons.BsChevronDown
                            className={`cursor-pointer text-xl bg-white transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            onClick={() =>
                              toggleEntityPermissions(permission.entity)
                            }
                          />
                        </div>

                        {isOpen && (
                          <div className="ml-[5%] grid grid-cols-3 gap-2 md:grid-cols-4">
                            {[
                              "create",
                              "viewOwn",
                              "viewMultiple",
                              "viewOne",
                              "updateOwn",
                              "updateMultiple",
                              "updateOne",
                              "deleteOwn",
                              "deleteMultiple",
                              "deleteOne",
                            ].map((field) => (
                              <div
                                key={field}
                                className="flex items-center space-x-1 p-1 bg-gray-100 rounded-lg text-xs"
                              >
                                <label
                                  htmlFor={field}
                                  className="text-gray-700 text-xs capitalize"
                                >
                                  {field}
                                </label>
                                <input
                                  type="checkbox"
                                  checked={
                                    updatePermissionData[permission.entity]?.[
                                      field
                                    ] || false
                                  }
                                  onChange={(e) =>
                                    handlePermissionChange(
                                      permission.entity,
                                      field,
                                      e.target.checked
                                    )
                                  }
                                  className="h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="modal-footer flex justify-center mt-6">
                  <button
                    className={`text-white h-[40px] w-[120px] rounded-lg bg-[#173b3f] ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "hover:bg-[#145a58]"
                    } transition-all duration-300 ease-in-out`}
                    type="submit"
                    onClick={handleUpdateRole}
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </Box>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default RolePermission;
