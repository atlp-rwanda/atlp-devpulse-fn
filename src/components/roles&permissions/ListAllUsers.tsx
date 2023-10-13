import { FunctionComponent, useEffect, useState } from "react";
import { HiDotsVertical, HiCheck } from "react-icons/hi";
import Box from "@mui/material/Box";
import * as icons from "react-icons/ai";
import { toast } from "react-toastify";
import { getAllMembers, assignMemberRoles } from "../../redux/actions/users";
import { useAppDispatch } from "../../hooks/hooks";
import { connect } from "react-redux";
import { updateStatus } from "../../redux/actions/updateUserStatus";
import { getRoles } from "../../redux/actions/roles";
import { deleteUser } from "../../redux/actions/deleteUser";
import { inviteUser } from "../../redux/actions/inviteUser";

const book: string = require("../../assets/assets/book.svg").default;
const profile: string = require("../../assets/avatar.png").default;

const placeholderImage = profile;

const onImageError = (e) => {
  e.target.src = placeholderImage;
};

interface Update {
  id: string;
  open: boolean;
  isActive: boolean;
}

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

type Props = {
  members: User[];
  searchFilter: User[];
  roles: any;
  updateMember: (data: any, id) => void;
  handleRemove: (id: any) => void;
};

const ListAllUsers: FunctionComponent<Props> = (props) => {
  const [dropRoles, setDropRoles] = useState("");
  const [addNewTraineeModel, setAddNewTraineeModel] = useState(false);
  const [autoFill, setAutoFill] = useState("");
  const [emailfilter, setemailfilter] = useState("");
  const [results, setResults] = useState<any>([]);
  const [result, setResult] = useState<any>([]);
  const [member, setmembers] = useState<any>(null);
  const [handleRole, sethandleRole] = useState("");
  const [moredrop, setmoredrop] = useState("");
  const [status, setStatus] = useState<any>("");
  const [userName, setUserName] = useState<any>("");
  const [pending, setPending] = useState(false);
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    isActive: false,
    firstname: "",
    lastname: "",
    picture: "",
    role: {
      roleName: "",
      description: "",
      _id: "",
    },
    permissions: [],
  });

  const [deleteWarn, setDeleteWarn] = useState<Update>({
    id: "",
    open: false,
    isActive: false,
  });

  const [statWarn, setStatWarn] = useState<Update>({
    id: "",
    open: false,
    isActive: false,
  });

  const dispatch = useAppDispatch();
  const { members, roles, searchFilter, updateMember, handleRemove } = props;

  useEffect(() => {
    dispatch(getAllMembers());
    dispatch(getRoles());
  }, [member]);

  const handleMoreOptions = (userid: any) => {
    if (!moredrop) setmoredrop(userid);
    if (moredrop) setmoredrop("");
  };

  const updateRoles = (id: any) => {
    dropRoles === "" ? setDropRoles(id) : setDropRoles("");
  };

  const Open = () => {
    setAddNewTraineeModel(true);
  };

  const removeModel = () => {
    let newState = !addNewTraineeModel;
    setAddNewTraineeModel(newState);
  };

  const validation = async () => {
    setPending(true);
    if (emailfilter === "" || userName === "") {
      setPending(false);
      toast.error("Email field or Name field must not be empty!!");
      return;
    } else {
      const response = await inviteUser(userName, emailfilter, handleRole);
      if (
        response?.data?.data?.createUser_Logged !== undefined &&
        response?.data?.data?.createUser_Logged !== null
      ) {
        setPending(false);
        setAddNewTraineeModel(false);
        setmembers(response);
        updateMember("add member", response.data?.data?.createUser_Logged);
        toast.success("The Invitation is sent successfully");
      } else {
        response?.data?.errors !== undefined
          ? toast.error(response?.data?.errors[0].message)
          : toast.error("Something went wrong");
        setPending(false);
      }
    }
  };

  const handleUserSearchFilter = async (e: any) => {
    setAutoFill(e.target.value);

    const results = searchFilter?.filter((item: any) => {
      const name = `${item?.firstname} ${item?.lastname}`;
      return (
        e.target.value &&
        item &&
        item?.firstname &&
        item?.lastname &&
        name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });

    setResult(results);
  };

  const handleEmailFilter = async (e: any) => {
    setemailfilter(e.target.value);

    const results = searchFilter?.filter((item: any) => {
      return (
        e.target.value &&
        item &&
        item?.email &&
        item?.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });

    setResults(results);
  };

  const handleChangeStatus = async (id: any) => {
    const data = await updateStatus(id);

    if (
      data?.data?.data?.updateUserStatus !== undefined &&
      data?.data?.data?.updateUserStatus !== null
    ) {
      setStatWarn({ ...statWarn, open: false });
      setmembers(data);
      setUser({ ...user, isActive: data?.data?.data?.updateUserStatus });
      updateMember(data, id);
      toast.success("status updated successfully");
    } else {
      data?.data?.errors !== undefined
        ? toast.error(data?.data?.errors[0].message)
        : toast.error("Something went wrong");
    }
  };

  const handleDeleteUser = async (id: any) => {
    const data = await deleteUser(id);
    if (
      data?.data?.data?.deleteUser_Logged !== undefined &&
      data?.data?.data?.deleteUser_Logged !== null
    ) {
      setmembers(data);
      setUser({
        id: "",
        email: "",
        isActive: false,
        firstname: "",
        lastname: "",
        picture: "",
        role: {
          roleName: "",
          description: "",
          _id: "",
        },
        permissions: [],
      });
      handleRemove(id);
      toast.success("member removed successfully");
    } else {
      data?.data?.errors !== undefined
        ? toast.error("Unautholized to delete Member")
        : toast.error("Something went wrong");
    }
  };

  const handleAssignRole = async (userId: any, roleId: any) => {
    const data = await assignMemberRoles(userId, roleId);
    if (data?.data?.assignRoleToUser.role) {
      setUser({ ...user, role: data?.data?.assignRoleToUser.role });
      setmembers(data);
      updateMember(data, userId);
      toast.success("role updated successfully");
    } else {
      data?.data?.errors !== undefined
        ? toast.error(data?.data?.errors[0].message)
        : toast.error("Something went wrong");
    }
  };

  const assignRole = async (roleId: any) => {
    setmembers(roleId);
    sethandleRole(roleId);
  };

  const handleSearch = async (name: any) => {
    setAutoFill(name?.name);
    setUser(name);
    setResult([]);
  };

  const handlSearch = async () => {
    autoFill === "" &&
      setUser({
        id: "",
        email: "",
        isActive: false,
        firstname: "",
        lastname: "",
        picture: "",
        role: {
          roleName: "",
          description: "",
          _id: "",
        },
        permissions: [],
      });
  };

  return (
    <div className="  ">
      <div className=" grid grid-rows-2 pb-2 max-w-full lg:grid-cols-2 ">
        <div>
          <div className="flex ">
            <div className=" border-gray-600 rounded-l h-[30px] bg-white flex items-center justify-center w-[50px]">
              <icons.AiOutlineSearch
                className="text-gray-600 cursor-pointer hover:text-cyan-300"
                onClick={() => handlSearch()}
              />
            </div>
            <input
              type="text"
              placeholder="seach by name or email..."
              className=" text-[12px] text-gray-600 border-gray-600  px-3 rounded-r h-[30px] w-[250px] focus:outline-none"
              value={autoFill}
              onChange={(e) => {
                setAutoFill(e.target.value);
                handleUserSearchFilter(e);
              }}
            />
          </div>
          <div className=" absolute z-30 w-[300px] bg-gray-300 dark:bg-[#1d2434]  max-h-[300px] rounded-b shadow-md overflow-y-scroll">
            {result && (
              <table className="w-full">
                <tbody>
                  {result.map((items) => {
                    return (
                      <tr
                        key={items?.id}
                        className="dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 text-sm cursor-pointer"
                        onClick={() => handleSearch(items)}
                      >
                        <td className=" py-3 flex justify-center">
                          {" "}
                          <img
                            src={items?.picture}
                            alt=""
                            className="w-[30px] h-[30px] rounded-full"
                          />
                        </td>
                        <td className="">
                          {`${items?.firstname}` + " " + `${items?.lastname}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <button
          placeholder="Role"
          className=" lg:absolute text-md text-sm  text-center text-white rounded dark:bg-green bg-primary w-[120px] lg:right-[80px] lg:w-[150px] py-2 px-3"
          onClick={Open}
        >
          Add member
        </button>
      </div>
      <div className="bg-white  dark:bg-dark-bg shadow-lg px-5 py-8 rounded-t-md w-[100%]">
        <div className='rounded-lg h-[56vh] overflow-y-scroll shadow'>
            <table className=" container min-w-full ">
              <thead className=" w-full px-32 sticky top-0 ">
                <tr>
                  <th className="p-6  bg-gray-200 dark:bg-[#111827] text-left  text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    {"Name"}
                  </th>

                  <th className="px-5 py-3  bg-gray-200 dark:bg-[#111827]  text-center  text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                    {"Status"}
                  </th>
                  <th className="px-5 py-3  bg-gray-200 dark:bg-[#111827]  text-center  text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    {"Roles"}
                  </th>
                  {
                    <th className="px-5 py-3  bg-gray-200 dark:bg-[#111827]  text-center  text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                      {"Actions"}
                    </th>
                  }
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {user?.id !== undefined && user.id !== "" ?
                  (<tr key={user?.id} className={` border-dark-tertiary bg-bg-dark-bg`}>
                    <td className="px-2 border-b border-gray-200 dark:border-dark-tertiary lg:text-sm sm:text-[10px]">
                      <div className="flex">
                        <div className="flex sm:space-x-2 lg:space-x-5 items-center" >
                          <img src={user?.picture ? user?.picture : placeholderImage}
                            alt="profile pic"
                            onError={onImageError}
                            className="w-[25px] h-[25px] lg:h-[40px] lg:w-[40px] rounded-full" />
                          <p className="text-gray-900 dark:text-white whitespace-no-wrap my-5">
                            {(user?.firstname !== null && user?.lastname !== null) ? `${user?.firstname}` + " " + `${user?.lastname}` : (user?.firstname === null && user?.lastname !== null ) ? `${user?.lastname}` : (user?.firstname !== null && user?.lastname === null ) ? `${user?.firstname}` : "No name"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 border-b border-gray-200 dark:border-dark-tertiary text-sm text-center">
                      <div className="">
                        <div className="">
                          {status !== "" ?
                            <p className={`whitespace-no-wrap ${status == true ? "text-green" : "text-red-600"}`} >
                              {status ? "Active" : "Inactive"}
                            </p> :

                            <p className={`whitespace-no-wrap ${user?.isActive == true ? "text-green" : "text-red-600"}`} >
                              {user?.isActive ? "Active" : "Inactive"}
                            </p>

                          }
                        </div>
                      </div>
                    </td>

                    <td className="px-2 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                      <div className="flex justify-center">
                        <div className="">
                          <div className=' px-2 py-1 h-[50px] lg:w-[120px] lg:h-[30px] border border-gray-100 rounded-bt-rd lg:text-sm text-[10px]'>
                            <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap cursor-pointer" onClick={() => updateRoles(user?.id)}>
                              <span className='text-gray-500'>Role: </span> {user.role === null ? "no role" : `${user?.role?.roleName.slice(0, 8)}`}
                            </p>
                          </div>
                          <div className={` absolute border dark:border-gray-200 rounded dark:bg-slate-900 bg-gray-200 max-h-[250px] overflow-y-scroll ${dropRoles === user?.id ? "block" : "hidden"}`}>
                            <p className=' border-b dark:border-gray-200 border-gray-300 dark:text-white  p-2 sticky top-0 dark:bg-slate-900 bg-gray-200'>
                              Choose a Role
                            </p>
                            {roles?.message?.map((role: any) => (
                              <div key={role._id} className=' py-3 px-3 border-b dark:border-gray-200 dark:hover:bg-gray-800 hover:bg-gray-300 border-gray-300 cursor-pointer' onClick={() => handleAssignRole(user?.id, role._id)}>
                                <div className='flex space-x-2'>
                                  {(user?.role?.roleName === role?.roleName) ? <HiCheck className=" text-green text-base mt-[4px]" /> : <div className=' p-2'></div>}
                                  <p className=' font-bold dark:text-white text-base '>  {role.roleName}</p>
                                </div>
                                <p className=' dark:text-gray-500 mt-1 ml-5 sm:w-[100px] lg:w-[250px]'> {role.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className=' border-b dark:border-dark-tertiary text-center'>
                      <div className=' flex justify-center' >
                        <HiDotsVertical
                          className=" text-black dark:text-white text-3xl cursor-pointer"
                          onClick={(e: any) => {
                            e.preventDefault();
                            handleMoreOptions(user?.id)
                          }}
                        />
                        <div
                          className={`${moredrop === user?.id
                            ? "block"
                            : "hidden"
                            } absolute  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                          id="dropdown"
                        >
                          <ul
                            className="py-1"
                            aria-labelledby="dropdown"
                          >
                            <li>
                              <div
                                className="text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  setStatWarn({
                                    id: user?.id,
                                    open: true,
                                    isActive: user?.isActive
                                  });
                                }}
                              >
                                Change Status
                              </div>
                            </li>
                            <li>
                              <div
                                className="text-sm hover:bg-gray-100 text-gray-700   dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  setDeleteWarn({
                                    id: user?.id,
                                    open: true,
                                    isActive: user?.isActive
                                  })
                                }}
                              >
                                Remove Member
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>)
                  : members !== null
                    ? members?.map((item: any, index) =>

                      <tr key={item?.id} className={` border-dark-tertiary ${(index % 2 === 0 || index == 0 ? "bg-bg-dark-bg" : "dark:bg-[#111827]")}`}>
                        <td className="px-2 border-b border-gray-200 dark:border-dark-tertiary lg:text-sm text-[10px]">
                          <div className="flex">
                            <div className="flex sm:space-x-2 lg:space-x-5 items-center" >
                              <img src={item?.picture ? item?.picture : placeholderImage}
                                alt="profile pic"
                                onError={onImageError}
                                className="w-[25px] h-[25px] lg:h-[40px] lg:w-[40px] rounded-full" />
                              <p className="text-gray-900 dark:text-white whitespace-no-wrap my-5">
                                {(item?.firstname !== null && item?.lastname !== null) ? `${item?.firstname}` + " " + `${item?.lastname}` : (item?.firstname === null && item?.lastname !== null ) ? `${item?.lastname}` : (item?.firstname !== null && item?.lastname === null ) ? `${item?.firstname}` : "No name"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 border-b border-gray-200 dark:border-dark-tertiary text-sm text-center">
                          <div className="">
                            <div className="">
                              <p className={`whitespace-no-wrap ${item?.isActive == true ? "text-green" : "text-red-600"}`}>
                                {item?.isActive ? "Active" : "Inactive"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-2 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                          <div className="flex justify-center">
                            <div className="">
                              <div className=' px-2 py-1 h-[50px] lg:w-[120px] lg:h-[30px] border border-gray-100 rounded-bt-rd'>
                                <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap cursor-pointer lg:text-sm text-[10px]" onClick={() => updateRoles(item?.id)}>
                                  <span className='text-gray-500'>Role: </span> {item?.role === null ? "no role" : `${item?.role?.roleName.slice(0, 8)}`}
                                </p>
                              </div>
                              <div className={` absolute z-20 border dark:border-gray-200 border-gray-200 rounded dark:bg-slate-900 bg-gray-200 max-h-[250px] overflow-y-scroll ${dropRoles === item?.id ? "block" : "hidden"} ${(members?.length - 1) === index && index >= 5 ? " bottom-0" : ""}`}>
                                <div className='flex sm:space-x-[70px] lg:space-x-[160px] border-b dark:border-gray-200 border-gray-300 dark:text-white p-2 sticky top-0 dark:bg-slate-900 bg-gray-200'>
                                  <h4 >
                                    Choose a Role
                                  </h4>
                                  <icons.AiOutlineClose
                                    className=" mt-0 mr-0 text-xl cursor-pointer hover:text-red-600"
                                    onClick={() => setDropRoles("")}
                                  />
                                </div>

                                {roles.message?.map((role: any) => (
                                  <div key={role._id} className=' py-3 px-3 border-b dark:border-gray-200 dark:hover:bg-gray-800 hover:bg-gray-300 border-gray-300 cursor-pointer' onClick={() => handleAssignRole(item?.id, role._id)}>
                                    <div className='flex space-x-2'>
                                      {(item?.role?.roleName === role?.roleName) ? <HiCheck className=" text-green text-base mt-[4px]" /> : <div className=' p-2'></div>}
                                      <p className=' font-bold dark:text-white text-base '>  {role.roleName}</p>
                                    </div>
                                    <p className=' dark:text-gray-500 mt-1 ml-5 sm:w-[100px] lg:w-[250px]'> {role.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className='  border-b dark:border-dark-tertiary  text-center'>
                          <div className=' flex justify-center' >
                            <HiDotsVertical
                              className=" text-black dark:text-white text-3xl cursor-pointer"
                              onClick={(e: any) => {
                                e.preventDefault();
                                handleMoreOptions(item?.id)
                              }}
                            />
                            <div
                              className={`${moredrop === item?.id
                                ? "block"
                                : "hidden"
                                } absolute  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                              id="dropdown"
                            >
                              <ul
                                className="py-1"
                                aria-labelledby="dropdown"
                              >
                                <li>
                                  <div
                                    className="text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                    onClick={(e: any) => {
                                      e.preventDefault();
                                      setStatWarn({
                                        id: item.id,
                                        open: true,
                                        isActive: item?.isActive
                                      })
                                    }}
                                  >
                                    Change Status
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="text-sm hover:bg-gray-100 text-gray-700   dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                    onClick={(e: any) => {
                                      e.preventDefault();
                                      setDeleteWarn({
                                        id: item?.id,
                                        open: true,
                                        isActive: item?.isActive
                                      })
                                    }}
                                  >
                                    Remove Member
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                    : null}
              </tbody>
            </table>
          {deleteWarn.open &&
            <div
              className={`h-screen w-screen z-50 bg-black bg-opacity-10 backdrop-blur-sm absolute flex items-center justify-center  px-4 top-0 left-0 ${
                deleteWarn.open === true ? "block" : "hidden"
              }`}
            >
              <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[5px] dark:bg-dark-bg bg-[#f0f0f0]">
                <div className="block w-[300px] h-[200px] dark:bg-dark-bg  dark:text-white bg-[#f0f0f0] rounded-[5px]">
                  <div className="text-center">
                    <icons.AiFillExclamationCircle className="w-[40px] my-[20px] mx-auto text-[40px]" />
                    <p className="w-[60%] m-auto font-bold">
                      Are you sure you want to delete this member?
                    </p>
                  </div>
                  <div className="flex flex-wrap my-[20px] mx-0">
                    <button
                      className="block text-white bg-[#940000] my-[10px] mx-auto rounded-[5px] w-[100px] h-[40px]"
                      onClick={() => {
                        handleDeleteUser(deleteWarn?.id);
                        setDeleteWarn({ ...deleteWarn, open: false });
                        setmoredrop("");
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-auto bg-[#ABB8C3] text-[#fff]"
                      onClick={() => {
                        setDeleteWarn({ ...deleteWarn, open: false });
                        setmoredrop("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Box>
            </div>
          )}

          {statWarn.open && (
            <div
              className={`h-screen w-screen z-50 bg-black bg-opacity-10 backdrop-blur-sm absolute flex items-center justify-center  px-4 top-0 left-0 ${
                statWarn.open === true ? "block" : "hidden"
              }`}
            >
              <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[5px] dark:bg-dark-bg bg-[#f0f0f0]">
                <div className="block w-[300px] h-[200px] dark:bg-dark-bg  dark:text-white bg-[#f0f0f0] rounded-[5px]">
                  <div className="text-center">
                    <icons.AiFillExclamationCircle className="w-[40px] my-[20px] mx-auto text-[40px]" />
                    <p className="w-[80%] m-auto font-bold">
                      {statWarn?.isActive
                        ? "Are you sure you want to disactivate this member?"
                        : "Are you sure you want to activate this member?"}
                    </p>
                  </div>
                  <div className="flex flex-wrap my-[20px] mx-0">
                    <button
                      className={`block text-white ${
                        statWarn?.isActive ? "bg-[#f7d456]" : "bg-[#56C870]"
                      } my-[10px] mx-auto rounded-[5px] w-[100px] h-[40px]`}
                      onClick={() => {
                        handleChangeStatus(statWarn?.id);
                        setStatWarn({ ...statWarn, open: false });
                        setmoredrop("");
                      }}
                    >
                      {statWarn?.isActive ? "Disactivate" : "Activate"}
                    </button>
                    <button
                      className="h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-auto bg-[#ABB8C3] text-[#fff]"
                      onClick={() => {
                        setStatWarn({ ...statWarn, open: false });
                        setmoredrop("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Box>
            </div>
          )}
        </div>
      </div>

      {/* --------------------------- Add a member ------------------------------------------------- */}

      <div
        className={`h-screen w-screen z-50 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 top-0 left-0 ${
          addNewTraineeModel === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white dark:bg-dark-bg w-full lg:w-[50%] xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <div className="font-bold text-sm text-primary dark:text-white text-center w-11/12 ">
              <icons.AiOutlineClose
                className="float-right text-xl cursor-pointer hover:text-red-600"
                onClick={() => removeModel()}
              />

              <img src={book} className=" mx-auto my-3 stroke-primary" alt="" />
              <p>Add new member with role</p>
            </div>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <section className=" py-2 px-8">
              <div className="input my-2 mb-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name=""
                    className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-10 font-sans text-sm py-2 w-full pt-4"
                    placeholder={"Enter Member Names"}
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input my-2 mb-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="email"
                    name=""
                    className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-10 font-sans text-sm py-2 w-full pt-4"
                    placeholder={"Invite member by email ..."}
                    value={emailfilter}
                    onChange={(e) => {
                      setemailfilter(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                {
                  <div
                    className={`mb-8 border dark:border-gray-200 border-gray-200 rounded dark:bg-slate-900 bg-gray-200 max-h-[250px] overflow-y-scroll`}
                  >
                    <h4 className=" border-b dark:border-gray-200 border-gray-300 dark:text-white p-2 sticky top-0 dark:bg-slate-900 bg-gray-200">
                      Choose a Role
                    </h4>
                    {roles.message?.map((role: any) => (
                      <div
                        key={role._id}
                        className=" py-3 px-3 border-b dark:border-gray-200 dark:hover:bg-gray-800 hover:bg-gray-300 border-gray-300 cursor-pointer"
                        onClick={() => assignRole(role._id)}
                      >
                        <div className="flex space-x-2">
                          {handleRole === role?._id ? (
                            <HiCheck className=" text-green text-base mt-[4px]" />
                          ) : (
                            <div className=" p-2"></div>
                          )}
                          <p className=" font-bold dark:text-white text-base ">
                            {" "}
                            {role.roleName}
                          </p>
                        </div>
                        <p className=" dark:text-gray-500 mt-1 ml-5 w-[250px]">
                          {" "}
                          {role.description}
                        </p>
                      </div>
                    ))}
                  </div>
                }
              </div>
              {pending ? (
                <button
                  className=" bg-primary text-sm dark:bg-[#56C870] rounded-md py-2 text-white font-medium cursor-pointer m-auto w-full text-center"
                  disabled
                >
                  <svg
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
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
                  className=" bg-primary text-sm dark:bg-[#56C870] rounded-md py-2 text-white font-medium cursor-pointer m-auto w-full text-center"
                  onClick={validation}
                >
                  Invite a person
                </button>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAllUsers;
