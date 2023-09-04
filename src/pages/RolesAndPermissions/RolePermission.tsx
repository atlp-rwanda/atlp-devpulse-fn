import React, { useEffect, useMemo, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { usePagination, useTable } from 'react-table';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io5';
import NavBar from '../../components/sidebar/navHeader';
import { useForm } from 'react-hook-form';
import {
  RolePermission,
  roleSchema,
} from '../../components/validation/Register';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../../redux/actions/axiosconfig';
import { toast } from 'react-toastify';
import EntityDropdown from '../../components/roles&permissions/EntityDropdown';
import EntityDropdown2 from '../../components/roles&permissions/EntityDropdown2';
import EntityDropdown3 from '../../components/roles&permissions/EntityDropdown3';
import EntityDropdown4 from '../../components/roles&permissions/EntityDropdown4';

function RolePermission(props: any) {
  const token = localStorage.getItem('access_token');

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

  const [currentDropdownIndex, setCurrentDropdownIndex] = useState<
    number | null
  >(null);
  const [isEntitySelected, setIsEntitySelected] = useState(false);
  const [isPermissionSelected, setIsPermissionSelected] = useState(false);
  const [updateDescription, setUpdateDesciption] = useState('');
  const [openUpdateModal, setOpenUpdateModel] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null);
  const [openP, setOpenP] = useState(false);
  const [openP2, setOpenP2] = useState(false);
  const [openP3, setOpenP3] = useState(false);
  const [openP4, setOpenP4] = useState(false);
  const [isAnError, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState<any>([]);
  const [permissions2, setPermissions2] = useState<any>([]);
  const [permissions3, setPermissions3] = useState<any>([]);
  const [permissions4, setPermissions4] = useState<any>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedEntity2, setSelectedEntity2] = useState('');
  const [selectedEntity3, setSelectedEntity3] = useState('');
  const [selectedEntity4, setSelectedEntity4] = useState('');
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const finalPermission = [
      {
        entity: selectedEntity,
        permissions: permissions,
      },
      {
        entity: selectedEntity2,
        permissions: permissions2,
      },
      {
        entity: selectedEntity3,
        permissions: permissions3,
      },
      {
        entity: selectedEntity4,
        permissions: permissions4,
      },
    ];
    const filteredPermissions = finalPermission.filter(
      (item) => item.entity !== undefined && item.entity !== ''
    );
    console.log('Filtered permission ==>', filteredPermissions);
    try {
      const parsedData = roleSchema.parse(data);
      const response = await axios.post('/', {
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
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      if (response.data.errors) {
        toast.error(response.data.errors[0].message);
        setIsLoading(false);
      } else {
        const successMessage =
          response.data.message || 'Role created successfully';
        toast.success(successMessage);
        const newRole = {
          roleName: parsedData.Name,
          description: parsedData.Description,
        };
        // @ts-expect-error
        setRoles((prevRoles) => [...prevRoles, newRole]);
        handleCloseCreateModel();
      }
      console.log(response.data.message);
    } catch (error: any) {
      showToast(error, 'error');
      console.log('Error is ==>', error.message);
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

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await axios.post('/', {
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
  }, [roles]);
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

  const COLS = [
    {
      Header: 'Role Name',
      accessor: 'roleName',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: ' ',
      accessor: '',
      Cell: ({ row }: any) => (
        <div>
          <BsIcons.BsThreeDotsVertical
            className=' text-black relative dark:text-white text-3xl cursor-pointer'
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
      data: roles,
    },
    usePagination
  );
  const { pageIndex, pageSize } = state;
  const entities = ['Users', 'Applications', 'Cohorts', 'Roles'];
  let entities2 = ['Users', 'Applications', 'Cohorts', 'Roles'];
  let entities3 = ['Users', 'Applications', 'Cohorts', 'Roles'];
  let entities4 = ['Users', 'Applications', 'Cohorts', 'Roles'];

  if (entities2.includes(selectedEntity)) {
    entities2 = entities.filter((ent) => ent !== selectedEntity);
  }
  if (entities3.includes(selectedEntity2)) {
    entities3 = entities2.filter((ent) => ent !== selectedEntity2);
  }

  if (entities4.includes(selectedEntity3)) {
    entities4 = entities3.filter((ent) => ent !== selectedEntity3);
  }

  return (
    <>
      <NavBar />
      <div className='flex dark:bg-dark-bg dark:text-white bg-[#F9F9FB] min-h-[100vh]'>
        <div className='min-h-[50vh] w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem]  pt-[80px] md:pl-0'>
          <div className=' table table-fixed w-[100%] top-[20%] md:top-[10%] pb-10 md:relative px-[10%] md:px-[10px]'>
            <button
              className='h-[40px] rounded-[5px]  dark:bg-[#56C870] bg-[#173b3f] text-white flex items-center p-0 pl-[5px] pr-[10px] mb-[20px]'
              onClick={() => handleOpenCreateRole()}
            >
              <span>Add new Role</span>
              <BsIcons.BsPlusLg className='mx-[5px]' />
            </button>
            <div>
              <div className=' w-[100%] dark:bg-dark-bg max-h-[70vh] m-auto  bg-[#fff] shadow-md rounded-[10px] relative pb-[20px]  overflow-x-auto  overflow-y-scroll 	md:w-[100%]'>
                <table
                  {...getTableProps()}
                  className='border-collapse w-[100%] m-auto rounded-[15px] whitespace-nowrap '
                >
                  <thead className=' w-full px-32 sticky top-0'>
                    {headerGroups.map((headerGroup: any, index: number) => (
                      <tr
                        key={index}
                        {...headerGroup.getHeaderGroupProps()}
                        className='border-solid border-[1px] border-white dark:border-dark-tertiary even:bg-[#eef1f1] first:w-[20px]'
                      >
                        {headerGroup.headers.map(
                          (column: any, index: number) => (
                            <th
                              key={index}
                              {...column.getHeaderProps}
                              className='border-solid pl-[30px] h-[50px] text-left dark:bg-dark-tertiary bg-[#eef1f1]  first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] dark:border-dark-tertiary py-6   last:pl-[0px] w-[150px] last:w-[20px]  first:w-[20px]  '
                            >
                              {column.render('Header')}
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
                          className='border-b dark:border-dark-tertiary border-gray-200 '
                          key={row.original._id}
                          onClick={() => setDeleteRoleId(row.original._id)}
                        >
                          {row.cells.map((cell: any) => (
                            <td
                              {...cell.getCellProps()}
                              className='pl-[30px] text-left max-w-[150px] overflow-x-auto p-4 last:w-[2px] last:pl-[0px]'
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='block mx-auto my-0 w-[100%]  bottom-0 overflow-x-auto'>
              <div className='w-[100%] flex items-center justify-center my-[30px]  mx-auto md:block md:mx-auto'>
                <span className='flex items-center md:justify-center md:mt-[10px]'>
                  <button
                    className='my-0 mx-[5px] px-[5px] py-0 dark:border-dark-tertiary dark:bg-dark-bg dark:text-white text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]'
                    disabled={!canPreviousPage}
                    onClick={() => gotoPage(0)}
                  >
                    <AiIcons.AiOutlineDoubleLeft />
                  </button>
                  <button
                    className=' border-solid border-[1px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] '
                    disabled={!canPreviousPage}
                    onClick={() => previousPage()}
                  >
                    <AiIcons.AiOutlineLeft />
                  </button>
                  <span className='flex flex-wrap md:hidden ' id='pages'>
                    {pageOptions?.map((pageOption: any, i: number) => (
                      <div>
                        <button
                          className={`border-solid border-[1px] mx-[2px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white  border-[#a8a8a8] bg-[#fff] w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 ${
                            pageIndex === i && 'bg-[#eef1f1]'
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
                    className=' border-solid border-[1px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]'
                    disabled={!canNextPage}
                    onClick={() => nextPage()}
                  >
                    <AiIcons.AiOutlineRight />
                  </button>
                  <button
                    className='my-0 mx-[5px] px-[5px] py-0 dark:border-dark-tertiary dark:bg-dark-bg dark:text-white text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]'
                    disabled={!canNextPage}
                    onClick={() => gotoPage(pageCount - 1)}
                  >
                    <AiIcons.AiOutlineDoubleRight />
                  </button>
                </span>{' '}
                <span className='flex ml-3 md:justify-center  text-center md:mt-3 md:ml-0'>
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
              'aria-labelledby': 'basic-button',
            }}
            anchorEl={anchorEl}
            anchorPosition={menuPosition}
            anchorReference='anchorPosition'
            onClose={handleClose}
            open={open}
          >
            <MenuItem onClick={() => handleOpenUpdateModal()}>
              <BsIcons.BsPencilFill className='mr-[5px]' />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleOpenDeleteRole(deleteRoleId)}>
              <BsIcons.BsFillTrashFill className='mr-[5px]' />
              Delete
            </MenuItem>
          </Menu>
        )}
        <Modal
          aria-describedby='parent-modal-description'
          aria-labelledby='parent-modal-title'
          onClose={handleCloseCreateModel}
          open={openCreateModal}
        >
          <Box className='absolute w-[65%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[90%] overflow-y-scroll '>
            <form
              action=''
              className=' relative w-[100%] rounded-[5px] h-[650px] m-auto p-[10px] pt-[5px] dark:bg-dark-bg bg-[#f0f0f0] '
              onSubmit={(event) => {
                handleSubmit(onSubmit)(event);
              }}
            >
              <h1 className='text-center font-bold dark:text-white text-[22px] m-[20px]'>
                {isEditable ? 'Edit a role' : 'Add a role'}
              </h1>
              <IoIcons.IoClose
                className='absolute top-[20px] right-[20px] text-[35px] cursor-pointer dark:text-white'
                onClick={handleCloseCreateModel}
              />
              <hr style={{ marginBottom: '4px' }} />
              <div>
                <label className='mr-3 p-14 dark:text-white font-bold text-[19px]'>
                  Name
                </label>
                <input
                  placeholder='Name'
                  type='text'
                  {...register('Name')}
                  className=' mt-2 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px] md:w-[90%]'
                />
                {errors.Name != null && (
                  <p className='text-red-500 text-sm text-center mt-1'>
                    {errors.Name.message}
                  </p>
                )}
              </div>
              <div>
                <label className='mr-3 p-14 dark:text-white font-bold text-[19px]'>
                  Description
                </label>
                <input
                  type='text'
                  {...register('Description')}
                  className=' mt-2 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px] md:w-[90%]'
                  placeholder='Description'
                />
                {errors.Description != null && (
                  <p className='text-red-500 text-sm text-center mt-1'>
                    {errors.Description.message}
                  </p>
                )}
              </div>
              <div
                className='text-white block cursor-pointer text-center border-[1px] border-[#a8a8a8] dark:bg-[#56C870] h-[40px] w-[120px] ml-20 rounded-[5px] my-[10px] mx-[auto] bg-[#173b3f]'
                onClick={handleAddPermission}
              >
                Add Pemission
              </div>
              <div className='w-full flex'>
                {currentDropdownIndex !== null && (
                  <div>
                    {currentDropdownIndex === 0 && (
                      <EntityDropdown
                        selectedEntity={selectedEntity}
                        setSelectedEntity={setSelectedEntity}
                        setOpenP={setOpenP}
                        entities={entities}
                        openP={openP}
                        setPermissions={setPermissions}
                        className=''
                      />
                    )}
                    {currentDropdownIndex === 1 && (
                      <EntityDropdown2
                        selectedEntity={selectedEntity2}
                        setSelectedEntity={setSelectedEntity2}
                        setOpenP={setOpenP2}
                        entities={entities2}
                        openP={openP2}
                        setPermissions={setPermissions2}
                        className=''
                      />
                    )}
                    {currentDropdownIndex === 2 && (
                      <EntityDropdown3
                        selectedEntity={selectedEntity3}
                        setSelectedEntity={setSelectedEntity3}
                        setOpenP={setOpenP3}
                        entities={entities3}
                        openP={openP3}
                        setPermissions={setPermissions3}
                        className=''
                      />
                    )}
                    {currentDropdownIndex === 3 && (
                      <EntityDropdown4
                        selectedEntity={selectedEntity4}
                        setSelectedEntity={setSelectedEntity4}
                        setOpenP={setOpenP4}
                        entities={entities4}
                        openP={openP4}
                        setPermissions={setPermissions4}
                        className=''
                      />
                    )}
                  </div>
                )}
              </div>
              <div className=''>
                {/* <div className='text-white border-[1px] border-[#a8a8a8] dark:bg-[#56C870] h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-[auto] bg-[#173b3f]'>
                  Preview
                </div> */}
                {isLoading ? (
                  <button
                    className='text-white border-[1px] border-[#a8a8a8] dark:bg-[#56C870] h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-[auto] bg-[#173b3f]'
                    disabled
                    type='submit'
                  >
                    <svg
                      className='inline mr-3 w-4 h-4 text-white animate-spin '
                      fill='none'
                      role='status'
                      viewBox='0 0 100 101'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='#56C870'
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    className='text-white border-[1px] border-[#a8a8a8] dark:bg-[#56C870] h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-[auto] bg-[#173b3f]'
                    type='submit'
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </Box>
        </Modal>
        <Modal
          aria-describedby='parent-modal-description'
          aria-labelledby='parent-modal-title'
          onClose={handleCloseDeleteModal}
          open={openDeleteModal}
        >
          <Box className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[5px] dark:bg-dark-bg bg-[#f0f0f0]'>
            <div className='block w-[300px] h-[200px] dark:bg-dark-bg dark:text-white bg-[#f0f0f0] rounded-[5px]'>
              <div className='text-center'>
                <AiIcons.AiFillExclamationCircle className='w-[40px] my-[20px] mx-auto text-[40px]' />
                <p className='w-[60%] m-auto font-bold'>
                  Are you sure you want to delete this Role?
                </p>
              </div>
              <div className='flex flex-wrap my-[20px] mx-0'>
                <button className='block text-white bg-[#940000] my-[10px] mx-auto rounded-[5px] w-[100px] h-[40px]'>
                  Delete
                </button>
                <button
                  className='h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-auto bg-[#ABB8C3] text-[#fff]'
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          aria-describedby='parent-modal-description'
          aria-labelledby='parent-modal-title'
          onClose={handleCloseUpdateModal}
          open={openUpdateModal}
        >
          <Box className='absolute w-[50%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[90%]'>
            <form
              action=''
              className='relative rounded-[5px] w-[100%] h-[455px] m-auto p-[10px] pt-[5px] dark:bg-dark-bg bg-[#f0f0f0] '
            >
              <h1 className='text-center dark:text-white font-bold text-[24px] m-[20px]'>
                Update
              </h1>
              <IoIcons.IoClose
                onClick={handleCloseUpdateModal}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '35px',
                  cursor: 'pointer',
                }}
              />
              <hr style={{ marginBottom: '40px' }} />
              <input
                className=' mt-3 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px] md:w-[90%]'
                name='name'
                placeholder='Role Name'
                type='text'
              />
              <input
                className=' mt-3 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px] md:w-[90%]'
                name='Description'
                onChange={(e) => {
                  setUpdateDesciption(e.target.value);
                }}
                type='text'
                placeholder='Description'
                value={updateDescription}
              />
              <div className='flex flex-wrap w-[300px] m-auto'>
                <button
                  className='text-white border-[1px] dark:bg-[#56C870] h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-[auto] bg-[#173b3f]'
                  type='submit'
                >
                  Save
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default RolePermission;
