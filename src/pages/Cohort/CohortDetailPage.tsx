import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import AddCohortModal from "../../components/Cohort/addCohortModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getCohort } from "../../redux/actions/cohortActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";

const CohortsDetailPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { id } = useParams();
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.cohorts?.isLoading);
  const traineeCohort = useAppSelector((state) => state.cohorts?.traineeCohort);

  const cohortsPerPage = 5;

  useEffect(() => {
    if (id) {
      dispatch(getCohort(id));
    }
  }, [dispatch, id]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return <Spinner className="mt-96" />;
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
                >
                  + Add trainee
                </Button>
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
