import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as icons from "react-icons/ai";
import {
	createScoreType,
	getAllScoreTypes,
	deleteScoreType,
	updateScoreType,
} from "../../redux/actions/scoreTypesActions";
import { getAllScoreValues } from "../../redux/actions/scoreValueActions";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NavBar from "../../components/sidebar/navHeader";
import DataTable from "components/TableData";
import filterTraineeReducer from "../../redux/reducers/filterTraineeReducer";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
	DOTS,
	useCustomPagination,
} from "../../components/Pagination/useCustomPagination";
import Select from "react-select";
const ScoreTypesActions = (props: any) => {
	const { scoreTypes, scoreValues } = props;

	const scoreTypesData = scoreTypes.data;

	const scoreValuesArray = scoreValues.data?.map((values: any, idx: number) => {
		return values.score_id.score_type;
	});

	const scoreTypesArray = scoreTypesData?.map((dta: any) => {
		const filtered = scoreValuesArray?.filter((values: any) => {
			return values == dta.score_type;
		});

		return {
			id: dta.id,
			description: dta.description,
			modeOfEngagement: dta.modeOfEngagement,
			duration: dta.duration,
			startDate: dta.startDate,
			endDate: dta.endDate,
			title: dta.title,
		};
	});
	console.log(scoreTypesArray);
	console.log("data from scoretypes", scoreTypesArray);

	useEffect(() => {
		props.getAllScoreTypes();
		props.getAllScoreValues();
	}, []);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [duration, setDuration] = useState("");
	const [startdate, setStartdate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [program, setProgram] = useState("");
	const [engagement, setEngagement] = useState("");
	const [deleteScoreTypeId, setdeleteScoreTypeId] = useState("");
	const [updateScoreTypeId, setupdateScoreTypeId] = useState("");
	const [openUpdateModal, setOpenUpdateModel] = useState(false);
	const [score_type, setscore_type] = useState("");
	const [id, setId] = useState("");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [activeCycle, setActiveCycle] = useState<number | undefined>(undefined);
	const [selectedOption, setSelectedOption] = useState("");
	const [selectedProgram, setSelectedProgram] = useState("");
	const [programDuration, setProgramDuration] = useState("");
	const [assessmentModel, setAssmentModel] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [page, setPage] = useState(0);
	const handleCloseUpdateModal = (e: any) => {
		e.preventDefault();
		setOpenUpdateModel(false);
	};
	const [openCreateModal, setOpenCreateModal] = useState(false);

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleCloseCreateModel = () => {
		setOpenCreateModal(false);
	};

	// useEffect(() => {
	// 	const handleClickOutside = (event) => {
	// 	  if (assessmentModel && event.target.classList.contains("modal")) {
	// 		handleClose();
	// 	  }
	// 	};

	// 	document.addEventListener("click", handleClickOutside);

	// 	return () => {
	// 	  document.removeEventListener("click", handleClickOutside);
	// 	};
	//   }, [assessmentModel, handleClose]);

	const handleOpenUpdateModal = (e: any) => {
		const cycle = scoreTypesData[activeCycle!];

		setOpenUpdateModel(true);
		setscore_type(cycle.score_type);
		setupdateScoreTypeId(cycle.id);
		setId(cycle.id);
		setAnchorEl(null);
	};
	const createScoreType = () => {
		const data = {
			description: description,
			duration: duration,
			endDate: endDate,
			modeOfEngagement: engagement, // This is assuming selectedOption is what you intended to use.
			program: program,
			startDate: startdate,
			title: title,

		};
		props.createScoreType(data);
		setOpenCreateModal(false);
		// setTimeout(() => {
		// 	window.location.reload();
		// }, 1000);
	};
	const handleOpenCreateCycle = () => {
		setAssmentModel(true);
		setOpenCreateModal(true);
	};
	const updateScoreType = () => {
		const data = {
			updateScoreTypeId,
			id,
			score_type,
		};
		props.updateScoreType(data);

		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};
	const deleteScoreType = () => {
		const data = {
			deleteScoreTypeId,
		};

		props.deleteScoreType(data);
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};
	console.log(assessmentModel, "<<<----------");

	const removeModel = () => {
		// let newState = !assessmentModel;
		setAssmentModel(!assessmentModel);
	};

	const options = [
		{ value: "remote", label: "remote" },
		{ value: "hybrid", label: "Hybrid" },
		{ value: "office", label: "Office" },
		{ value: "online", label: "Online" },
	];
	const programs = [
		{ value: "atlp", label: "ATLP", time: "9 months" },
		{ value: "rca", label: "RCA", time: "2 months" },
		{ value: "girlsProgram", label: "Girls Program", time: "2 months" },
		{ value: "kickstart", label: "Kick Start", time: "3 months" },
	];
	const [moredrop, setmoredrop] = useState("");
	const onSubmitHandler = (userid: any) => {
		if (!moredrop) setmoredrop(userid);
		if (moredrop) setmoredrop("");
	};
	const onSubmitHandle = async (userId: any) => {
		// await dispatch(deletetraine(userId));
		// setmoredrop("");
	};
	const onSubmitHandlesoft = async (userId: any) => {
		// await dispatch(softdeletetraine(userId));
		// setmoredrop("");
	};
	const getAllScoreTypes = [
		{
			id: "651c0e4dac2250d3acaa46b8",
			name: "Interview",
			nbr: 10,
			description: "this is the description",
			score_type: "Interview",
			program: "ATLP",
			mode: "online",
		},
		{
			id: "651eb4ea0b9622d3a3620707",
			name: "Qualified",
			nbr: 20,
			score_type: "Qualified",
			program: "ATLP",
			description: "this is the description",
			mode: "Office",
		},
		{
			id: "6522a406679e2421ffb44651",
			name: "English assessment",
			nbr: 30,
			score_type: "English assessment",
			program: "ATLP",
			description: "this is the description",
			mode: "Hybrid",
		},
		{
			id: "6522a74e679e2421ffb44696",
			name: "Hacckerrank",
			nbr: 19,
			description: "this is the description",
			program: "KickStart",
			score_type: "Hacckerrank",
			mode: "Office",
		},
		{
			id: "6522a764679e2421ffb4469b",
			name: "Uptitude test",
			nbr: 10,
			description: "this is the description",
			program: "RCA",
			score_type: "Uptitude test",
			mode: "Online",
		},
	];
	const filteredPrograms = programs?.filter(
		(program) => program?.label === selectedProgram
	);
	const paginationRange = useCustomPagination({
		totalPageCount: Math.ceil(filteredPrograms.length / itemsPerPage),
		currentPage: page,
	});
	return (
		<>
			<NavBar />
			<div className='flex bg-[#F9F9FB] min-h-[100vh]'>
				<div className='min-h-[50vh] w-[100%] mt-10 md:w-[100%] md:mt-0 pl-[16rem]  pt-[80px] md:pl-0 dark:bg-dark-frame-bg flex justify-start flex-col'>
					{assessmentModel ? (
						<Modal
							open={openCreateModal}
							onClose={handleCloseCreateModel}
							aria-labelledby='parent-modal-title'
							aria-describedby='parent-modal-description'>
							<Box className='absolute w-fit top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-fit'>
								<div className='bg-white dark:bg-dark-bg w-full rounded-lg p-4 pb-8'>
									<div className='card-title w-full flex  flex-wrap justify-center items-center  '>
										<h3 className='font-bold text-sm dark:text-white text-center w-11/12 '>
											<icons.AiOutlineClose
												className='float-right text-3xl cursor-pointer'
												onClick={() => removeModel()}
											/>

											{"Assessment"}
										</h3>
										<hr className=' bg-primary border-b my-3 w-full' />
									</div>
									<form
										onSubmit={createScoreType}
										className='border border-[#333] border-1 dark:text-[#ffffff9f] bg-[#eaeaea] dark:bg-dark-bg rounded-[5px] p-2 w-fit md:mx-auto my-7 space-y-3'>
										<input
											required
											type='text'
											placeholder='Title/Name'
											className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
											value={title}
											onChange={(e) => {
												e.preventDefault();
												setTitle(e.target.value);
											}}
										/>
										<input
											required
											type='text'
											placeholder='Description.'
											className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
											value={description}
											onChange={(e) => {
												e.preventDefault();
												setDescription(e.target.value);
											}}
										/>
										<input
											required
											type='text'
											placeholder='Duration'
											className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
											value={duration}
											onChange={(e) => {
												e.preventDefault();
												setDuration(e.target.value);
											}}
										/>
										<input
											required
											type='text'
											placeholder='Start date'
											className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
											value={startdate}
											onChange={(e) => {
												e.preventDefault();
												setStartdate(e.target.value);
											}}
										/>
										<input
											required
											type='text'
											placeholder='End date'
											className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
											value={endDate}
											onChange={(e) => {
												e.preventDefault();
												setEndDate(e.target.value);
											}}
										/>
										<input
											required
											type='text'
											placeholder='Program'
											className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
											value={program}
											onChange={(e) => setProgram(e.target.value)}
										/>
										<input
											required
											type='text'
											placeholder='Engagement'
											className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
											value={engagement}
											onChange={(e) => setEngagement(e.target.value)}
										/>
										{/* <select
											required
											className=' dark:bg-dark-tertiary border text-[#ffffff9f] border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
											value={selectedOption}
											onChange={(e) => {
												e.preventDefault();
												setSelectedOption(e.target.value);
											}}>
											<option value=''>Mode of engagement</option>
											{options.map((option) => (
												<option
													key={option.value}
													value={option.value}
													className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'>
													{option.label}
												</option>
											))}
										</select> */}
										{/* <div className='flex flex-row'>
											<select
												required
												className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
												value={selectedProgram}
												onChange={(e) => {
													e.preventDefault();
													setSelectedProgram(e.target.value);
												}}>
												<option value=''>Select Program</option>
												{programs.map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</select>
											<select
												required
												className=' dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4'
												value={programDuration}
												onChange={(e) => {
													e.preventDefault();
													setProgramDuration(e.target.value);
												}}>
												<option value=''>Program Duration</option>
												{filteredPrograms.map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</select>
										</div> */}
										<button
											type='submit'
											className='block text-white border border-[#333] border-1 bg-dark-bg rounded-[5px] p-2 w-[100px] mb-5 mx-auto'>
											SAVE
										</button>
									</form>
								</div>
							</Box>
						</Modal>
					) : (
						""
					)}
					<div className=''>
						<div className='flex px-8 flex-row space-x-8'>
							<button
								onClick={() => handleOpenCreateCycle()}
								className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer'>
								<icons.AiOutlinePlus className='mt-1 mr-1 font-bold' />{" "}
								Assessments
							</button>
							<Link to='/filter_trainee-applicants'>
								<button className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer'>
									<icons.AiOutlineSearch className='mt-1 mr-1 font-bold' />{" "}
									Search
								</button>
							</Link>
						</div>
						<div className='bg-white  dark:bg-dark-bg shadow-lg rounded-md w-[100%] mx-auto lg:w-[95%]'>
							<div>
								<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
									<div className='inline-block w-full h-[55vh] lg:min-w-full shadow rounded-lg overflow-y-scroll'>
										<table className='min-w-full leading-normal px-4'>
											<thead className='w-full px-32 sticky top-0'>
												<tr>
													<th className='p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
														{"Title"}
													</th>
													<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider'>
														{"Description"}
													</th>
													<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
														{"Engagement Mode"}
													</th>
													<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
														{"Duration"}
													</th>
													<th className='border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
														{"Program"}
													</th>
													<th className='border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
														{"action"}
													</th>
												</tr>
											</thead>
											<tbody>
												{scoreTypesArray?.map((values: any, i: number) => (
													<tr key={i}>
														<td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm'>
															<div className='flex'>
																<div className=''>
																	<p className='text-gray-900 text-center dark:text-white whitespace-no-wrap'>
																		{values.title}
																	</p>
																</div>
															</div>
														</td>
														<td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm'>
															<div className='flex items-center'>
																<div className=''>
																	<p className='text-gray-900 text-center dark:text-white whitespace-no-wrap'>
																		{values.description}
																	</p>
																</div>
															</div>
														</td>
														<td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm'>
															<div className='flex items-center'>
																<div className=''>
																	<p className='text-gray-900 items-center dark:text-white whitespace-no-wrap'>
																		{values.modeOfEngagement}
																	</p>
																</div>
															</div>
														</td>
														<td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm'>
															<div className='flex items-center'>
																<div className=''>
																	<p className='text-gray-900 items-center dark:text-white whitespace-no-wrap'>
																		{values.duration} month
																	</p>
																</div>
															</div>
														</td>
														<td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm'>
															<div className='flex items-center'>
																<div className=''>
																	<p className='text-gray-900 items-center dark:text-white whitespace-no-wrap'>
																		{values.program}
																	</p>
																</div>
															</div>
														</td>
														<td>
															<div>
																<HiDotsVertical
																	className=' text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer'
																	onClick={(e: any) => {
																		e.preventDefault();
																		onSubmitHandler(values.id);
																	}}
																/>
																<div
																	className={`${
																		moredrop === values.id ? "block" : "hidden"
																	} absolute right-10  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
																	id='dropdown'>
																	<ul
																		className='py-1'
																		aria-labelledby='dropdown'>
																		<li>
																			<Link
																				to={`/trainee-applicant/${values.id}/edit`}
																				className='text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white  block px-4 py-2'>
																				Edit
																			</Link>
																		</li>
																		<li>
																			<Link
																				to={`/trainee-applicant-details/${values.id}`}
																				className='text-sm hover:bg-gray-100 text-gray-700  dark:text-white   dark:hover:bg-gray-500 block px-4 py-2'>
																				View
																			</Link>
																		</li>
																		<li>
																			<div
																				className='text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2'
																				onClick={(e: any) => {
																					e.preventDefault();
																					onSubmitHandlesoft(values._id);
																				}}>
																				Soft Delete
																			</div>
																		</li>
																		<li>
																			<div
																				className='text-sm hover:bg-gray-100 text-gray-700   dark:hover:bg-gray-500 dark:text-white  block px-4 py-2'
																				onClick={(e: any) => {
																					e.preventDefault();
																					onSubmitHandle(values.id);
																				}}>
																				Hard Delete
																			</div>
																		</li>
																	</ul>
																</div>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
								<div className='py-3 flex items-center text-center justify-center pt-10'>
									<div className='pb-1'>
										<label htmlFor='' className='dark:text-zinc-100'>
											rows per page
										</label>
										<Select
											menuPlacement='top'
											className='sm:text-sm  w-13 rounded-bt-rd absolute active dark:bg-dark-frame-bg'
											options={[
												{ value: "10", label: "10" },
												{ value: "50", label: "50" },
												{ value: "100", label: "100" },
												{ value: "500", label: "500" },
												{ value: "1000", label: "1000" },
											]}
											defaultValue={{ value: "", label: "10" }}
											onChange={(e: any) => setItemsPerPage(Number(e?.value))}
										/>
									</div>
									<div
										className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'
										aria-label='Pagination'>
										<div
											className='relative z-0 inline-flex items-center ml-auto mr-auto  rounded-[2px] shadow-sm space-x-2'
											aria-label='Pagination'>
											<button
												className='my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8] dark:disabled:bg-[#485970]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100'
												onClick={() => setPage(0)}
												disabled={page <= 0}>
												<AiIcons.AiOutlineDoubleLeft />
											</button>
											<button
												className=' border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100 dark:disabled:bg-[#485970]'
												onClick={() => setPage(page - 1)}
												disabled={page <= 0}>
												<AiIcons.AiOutlineLeft />
											</button>
											{paginationRange?.map((pageNumber, idx) => {
												if (pageNumber === DOTS) {
													return (
														<div
															key={idx}
															className='dark:text-zinc-100 md:hidden'>
															...
														</div>
													);
												}

												if (pageNumber - 1 === page) {
													return (
														<button
															key={idx}
															className={`border-solid border-[1px] cursor-pointer border-[#a8a8a8] bg-[#fff] min-w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 rounded-[2px] md:hidden
                        ${page && "bg-[#d6dfdf] text-black"} 
                        ${page === 0 && "bg-[#d6dfdf] text-black"} 
                          `}
															onClick={() => setPage(pageNumber - 1)}>
															{pageNumber}
														</button>
													);
												}

												return (
													<button
														key={idx}
														className={`border-solid border-[1px]  cursor-pointer border-[#a8a8a8] bg-[#fff] min-w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 rounded-[2px] md:hidden`}
														onClick={() => setPage(pageNumber - 1)}>
														{pageNumber}
													</button>
												);
											})}
											<button
												className=' border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100'
												onClick={() => setPage(page + 1)}
												disabled={
													page >=
													Math.ceil(filteredPrograms.length / itemsPerPage) - 1
												}>
												<AiIcons.AiOutlineRight />
											</button>
											<button
												className='my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100'
												onClick={() =>
													setPage(
														Math.ceil(filteredPrograms.length / itemsPerPage) -
															1
													)
												}
												disabled={
													page >=
													Math.ceil(filteredPrograms.length / itemsPerPage) - 1
												}>
												<AiIcons.AiOutlineDoubleRight />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* })} */}
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}>
						<MenuItem
							onClick={(e) => {
								handleOpenUpdateModal(e);
							}}>
							Update
						</MenuItem>
						<MenuItem
							onClick={() => {
								deleteScoreType();
							}}>
							Delete
						</MenuItem>
					</Menu>{" "}
					<Modal
						open={openUpdateModal}
						onClose={handleCloseUpdateModal}
						aria-labelledby='parent-modal-title'
						aria-describedby='parent-modal-description'>
						<Box className='absolute w-fit top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[fit]'>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									updateScoreType();
								}}
								className='border border-[#333] border-1 bg-[#eaeaea] rounded-[5px] px-2 w-fit mx-auto '>
								<hr style={{ marginBottom: "40px" }} />
								<input
									required
									type='text'
									name='score_type'
									value={score_type}
									placeholder='Enter new score type name'
									onChange={(e) => {
										e.preventDefault();
										setscore_type(e.target.value);
									}}
									className='block border border-[#333] border-1 bg-[#ffffff] rounded-[5px] p-2 w-[260px] mx-auto mb-3'
								/>
								<div className='flex flex-wrap w-[300px] m-auto'>
									<button
										className='block text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] mb-5 mx-auto'
										type='submit'>
										SAVE
									</button>
								</div>
							</form>
						</Box>
					</Modal>
				</div>
			</div>
		</>
	);
};
const mapState = (state: any) => ({
	scoreTypes: state.scoreTypes,
	scoreValues: state.scoreValues,
});

export default connect(mapState, {
	createScoreType,
	getAllScoreTypes,
	deleteScoreType,
	updateScoreType,
	getAllScoreValues,
})(ScoreTypesActions);
