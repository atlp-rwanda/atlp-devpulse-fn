import React, { useEffect } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import AddCohortModal from "../../components/Cohort/addCohortModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  deleteCohort,
  getAllCohorts,
  getCohort,
} from "../../redux/actions/cohortActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateCohortModal from "../../components/Cohort/updateCohortmodal";
import { Spinner } from "flowbite-react";
import { CohortSkeleton } from "../../skeletons/cohortSkeleton";


const CohortsPage = () => {
  const [anchorEl, setAnchorEl] = useState({});
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCohortData, setSelectedCohortData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cohortsPerPage = 5;
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cohorts.data);
  const isLoading = useAppSelector((state) => state.cohorts.isLoading);

  useEffect(() => {
    dispatch(getAllCohorts());
  }, [dispatch]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleOpenUpdateModal = (cohort) => {
    setSelectedCohortData(cohort);
    setIsUpdateModalOpen(true);
    handleClose(cohort.id);
  };

  // Function to close the update modal
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCohortData(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClick = (event, cohortId) => {
    setAnchorEl({
      ...anchorEl,
      [cohortId]: event.currentTarget,
    });
  };

  const handleClose = (cohortId) => {
    setAnchorEl({
      ...anchorEl,
      [cohortId]: null,
    });
  };

  const handleDeleteCohort = async (id) => {
    try {
      await dispatch(deleteCohort(id));
      toast.success("Cohort deleted successfully");
      dispatch(getAllCohorts());
      handleClose(id);
    } catch (error: any) {
      toast.error(error.message || "Failed to create cohort! Try again");
    }
  };

  // Pagination logic
  const indexOfLastCohort = currentPage * cohortsPerPage;
  const indexOfFirstCohort = indexOfLastCohort - cohortsPerPage;
  const currentCohorts = data.slice(indexOfFirstCohort, indexOfLastCohort);

  const totalPages = Math.ceil(data.length / cohortsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (isLoading || !data) {
    return <CohortSkeleton />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="w-full min-h-screen dark:bg-dark-frame-bg dark:text-white bg-[#F9F9FB]">
        <div className="my-4 ml-4">
          <Button
            variant="contained"
            color="success"
            className="dark:bg-[#56C870] hover:dark:bg-[#59dc78]"
            onClick={handleOpenModal}
          >
            + Cohort
          </Button>
        </div>

        <div className="rounded-lg p-6  dark:bg-dark-frame-bg dark:text-white">
          <h2 className="text-lg font-semibold mb-4">COHORT LIST</h2>

          <div className="w-[95%] overflow-x-auto">
            <table className="min-w-full  dark:bg-dark-frame-bg dark:text-white bg-[#F9F9FB]">
              <thead>
                <tr className="text-left border-b border-gray-200 bg-gray-200 dark:bg-gray-700">
                  <th className="py-4 px-4">Name</th>
                  <th className="py-2 px-4">Program</th>
                  <th className="py-2 px-4">Phase</th>
                  <th className="py-2 px-4">Application cycle</th>
                  <th className="py-4 px-4">Starting date</th>
                  <th className="py-4 px-4">Closing date</th>
                  <th className="py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCohorts.map((cohort) => (
                  <tr
                    key={cohort.id}
                    className="border-b  dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="py-2 px-4">{cohort.title}</td>
                    <td className="py-2 px-4">{cohort.program.title}</td>
                    <td className="py-2 px-4">{cohort.phase}</td>
                    <td className="py-2 px-4">{cohort.cycle.name}</td>
                    <td className="py-2 px-4">{cohort.start}</td>
                    <td className="py-2 px-4">{cohort.end}</td>
                    <td className="py-2 px-4">
                      <IconButton
                        aria-controls={open ? "menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(e, cohort.id)}
                      >
                        <MoreVertIcon className="text-gray-400" />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl[cohort.id]}
                        open={Boolean(anchorEl[cohort.id])}
                        onClose={() => handleClose(cohort.id)}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <Link to={`/admin/cohort-details/${cohort.id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                        <MenuItem onClick={() => handleOpenUpdateModal(cohort)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteCohort(cohort.id)}>
                          Delete
                        </MenuItem>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AddCohortModal open={modalOpen} onClose={handleCloseModal} />
            <UpdateCohortModal
              open={isUpdateModalOpen}
              onClose={handleCloseUpdateModal}
              cohortData={selectedCohortData}
            />
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
      </div>
    </LocalizationProvider>
  );
};

export default CohortsPage;
