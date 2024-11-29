import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCohortModal from "../../components/Cohort/addCohortModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getCohort, getAllTraineeApplicants, acceptTrainee } from "../../redux/actions/cohortActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { CohortDetailSkeleton } from "../../skeletons/singleCohortSketon";

const CohortsDetailPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { id } = useParams();
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false);
  const [addTrainee, setAddTrainee] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.cohorts?.isLoading);
  const traineeCohort = useAppSelector((state) => state.cohorts?.traineeCohort);
  const trainees = useAppSelector((state) => state.cohorts?.trainees);

  const cohortsPerPage = 5;

  useEffect(() => {
    if (id) {
      dispatch(getCohort(id));
    }
  }, [dispatch, id]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddTraineeModal = async () => {
    setLoading(true);
    try {
      await dispatch(getAllTraineeApplicants());
      setAddTrainee(true);
    } catch (error) {
      console.error("Error adding trainee:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlecloseTraineeModal = () => {
    setAddTrainee(false);
  };

  const handleAddTrainee = async (traineeId) => {
    setLoading(true);
    try {
      const response = await dispatch(acceptTrainee(traineeId, id));
      if (response.payload.data.acceptTrainee.success) {
        setAddTrainee(false);
      } else {
        console.error('Error adding trainee:', response.payload.data.acceptTrainee.message);
      }
    } catch (error) {
      console.error('Error adding trainee:', error);
    } finally {
      setLoading(false);
      dispatch(getCohort(id));
    }
  };

  const traineesWithoutCohort = trainees?.filter((trainee) => !trainee.cohort);

  if (!traineeCohort || isLoading) {
  return <CohortDetailSkeleton />;
}

  const trainee = traineeCohort?.trainees || [];

  // Pagination logic
  const indexOfLastTrainee = currentPage * cohortsPerPage;
  const indexOfFirstTrainee = indexOfLastTrainee - cohortsPerPage;
  const currentTrainee = trainee.slice(indexOfFirstTrainee, indexOfLastTrainee);

  const totalPages = Math.ceil(trainee.length / cohortsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="w-full flex flex-col pt-5 min-h-screen dark:bg-dark-frame-bg dark:text-white bg-[#F9F9FB]">
          <h1 className="text-green text-2xl ml-10 font-bold pb-6">
            COHORT INFORMATION
          </h1>
          <div className="w-[50%] py-7 pl-10 ml-10 bg-gray-200 rounded-lg dark:bg-dark-tertiary">
            <div className="py-1">
              <span className="font-bold">COHORT : </span>
              <span>{traineeCohort?.title}</span>
            </div>
            <div className="py-2">
              <span className="font-bold">PROGRAM : </span>
              <span>{traineeCohort?.program.title}</span>
            </div>
            <div className="py-2">
              <span className="font-bold">CYCLE : </span>
              <span>{traineeCohort?.cycle.name}</span>
            </div>
            <div className="py-2">
              <span className="font-bold">PHASE : </span>
              <span>{traineeCohort?.phase}</span>
            </div>
            <div className="py-2">
              <span className="font-bold">START DATE : </span>
              <span>{traineeCohort?.start}</span>
            </div>
            <div className="py-2">
              <span className="font-bold">END DATE : </span>
              <span>{traineeCohort?.end}</span>
            </div>
          </div>
          <div className="w-[70%] ml-10 mt-10 overflow-x-auto">
            <div className="flex justify-between pb-5">
              <h2 className="text-lg font-semibold mb-4">COHORT TRAINEES</h2>
              <div className="self-end">
                <Button
                  variant="contained"
                  color="success"
                  className="dark:bg-[#56C870] hover:dark:bg-[#59dc78]"
                  onClick={handleAddTraineeModal}
                >
                  + Add trainee
                </Button>
                {addTrainee && (
                  <div className="absolute border dark:border-gray-200 rounded dark:bg-slate-900 bg-gray-200 max-h-[250px] overflow-y-scroll mt-2 z-10">
                    <div className="flex justify-between items-center border-b dark:border-gray-200 border-gray-300 dark:text-white p-2 sticky top-0 dark:bg-slate-900 bg-gray-200">
                      <p>
                        Choose a Trainee
                      </p>
                      <button onClick={handlecloseTraineeModal}>
                        <CloseIcon className="text-black dark:text-white" />
                      </button>
                    </div>
                    {loading ? (
                      <div className="flex justify-center items-center h-full w-full">
                      <Spinner className="h-8 w-8 mt-5" />
                      </div>
                    ) : (
                      traineesWithoutCohort?.map((trainee) => (
                        <div
                          key={trainee._id}
                          className="py-3 px-3 border-b dark:border-gray-200 dark:hover:bg-gray-800 hover:bg-gray-300 border-gray-300 cursor-pointer"
                          onClick={async () => {
                            await handleAddTrainee(trainee._id);
                            setAddTrainee(false);
                          }}
                        >
                          <div className="flex space-x-2">
                            <div className="p-2"></div>
                            <p className="font-bold dark:text-white text-base">
                              {trainee.firstName} {trainee.lastName}
                            </p>
                          </div>
                          <p className="dark:text-gray-500 mt-1 ml-5 sm:w-[100px] lg:w-[250px]">
                            {trainee.email}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
            <table className="min-w-full  dark:bg-dark-frame-bg dark:text-white bg-[#F9F9FB]">
              <thead>
                <tr className="text-left border-b border-gray-200 bg-gray-200 dark:bg-gray-700">
                  <th className="py-4 px-4">First Name</th>
                  <th className="py-2 px-4">Last Name</th>
                  <th className="py-2 px-1">Email</th>
                </tr>
              </thead>
              <tbody>
                {currentTrainee.length === 0 ? (
                  <tr className="w-full text-center border-b  dark:border-gray-700 hover:bg-gray-700">
                    <td colSpan={3} className="py-2 px-4 font-bold text-lg">
                      NO TRAINEE YET!
                    </td>
                  </tr>
                ) : (
                  currentTrainee.map((trainee) => (
                    <tr
                      key={trainee._id}
                      className="border-b  dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="py-2 px-4">{trainee.firstName}</td>
                      <td className="py-2 px-4">{trainee.lastName}</td>
                      <td className="py-2 px-4">{trainee.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <AddCohortModal open={modalOpen} onClose={handleCloseModal} />
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 mx-1 border rounded disabled:opacity-50"
              >
                &laquo;
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 mx-1 border rounded disabled:opacity-50"
              >
                &lt;
              </button>
              <span className="px-3 py-1 mx-1 border rounded bg-white dark:text-black">
                {currentPage}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 mx-1 border rounded disabled:opacity-50"
              >
                &gt;
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 mx-1 border rounded disabled:opacity-50"
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
};

export default CohortsDetailPage;
