import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getAllPrograms } from "../../redux/actions/programsActions";
import { getAllCycles } from "../../redux/actions/cyclesActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateCohort, getAllCohorts } from "../../redux/actions/cohortActions";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";

type FormFields = {
  title?: string;
  cycle?: string;
  program?: string;
  phase?: string;
  start?: string;
  end?: string;
};

const UpdateCohortModal = ({ open, onClose, cohortData }) => {
  const dispatch = useAppDispatch();
  const programData = useAppSelector((state: any) => state.programs?.data);
  const cycleData = useAppSelector((state: any) => state.cycles?.data);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormFields>();

  useEffect(() => {
    dispatch(getAllPrograms());
    dispatch(getAllCycles());

    // populate form fields with existing cohort data
    if (cohortData) {
      setValue("title", cohortData.title);
      setValue("cycle", cohortData.cycle?._id);
      setValue("program", cohortData.program?._id);
      setValue("phase", cohortData.phase);
      setValue("start", cohortData.start);
      setValue("end", cohortData.end);
    }
  }, [dispatch, cohortData, setValue]);

  if (!open) return null;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await dispatch(updateCohort(cohortData.id, data));
      toast.success("Cohort updated successfully");
      dispatch(getAllCohorts());
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to update cohort! Try again");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg w-[30%] p-6 relative bg-white dark:bg-dark-frame-bg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-black text-xl font-semibold dark:text-white">
            UPDATE COHORT
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon className="text-black dark:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded bg-transparent border border-gray-600 placeholder:text-black  focus:outline-none dark:placeholder:text-white"
            {...register("title")}
          />

          <select
            className="w-full  p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("cycle")}
          >
            <option value="" className="bg-gray-200 dark:bg-[#1e2124]">
              Select Cycle
            </option>
            {cycleData.map((cycle) => (
              <option
                key={cycle.id}
                value={cycle.id}
                className="bg-gray-200 dark:bg-[#1e2124]"
              >
                {cycle.name}
              </option>
            ))}
          </select>

          <select
            className="w-full  p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("program")}
          >
            <option value="" className="bg-gray-200 dark:bg-[#1e2124]">
              Select Program
            </option>
            {programData.map((program) => (
              <option
                key={program.id}
                value={program._id}
                className="bg-gray-200 dark:bg-[#1e2124]"
              >
                {program.title}
              </option>
            ))}
          </select>

          <select
            className="w-full  p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("phase")}
          >
            <option value="" className="bg-gray-200 dark:bg-[#1e2124]">
              Phase
            </option>
            <option
              value="Core Concept"
              className="bg-gray-200 dark:bg-[#1e2124]"
            >
              Core Concept
            </option>
            <option
              value="Team Project"
              className="bg-gray-200 dark:bg-[#1e2124]"
            >
              Team Project
            </option>
            <option
              value="Apprenticeship"
              className="bg-gray-200 dark:bg-[#1e2124]"
            >
              Apprenticeship
            </option>
          </select>

          <input
            type="date"
            className="w-full  p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("start")}
          />

          <input
            type="date"
            className="w-full  p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("end")}
          />

          <button
            type="submit"
            className="w-full p-3 flex justify-center items-center bg-[#56C870] text-white rounded font-medium hover:bg-green-600 transition-colors"
          >
            {isSubmitting ? (
              <ThreeDots height="20" width="30" color="#ffffff" />
            ) : (
              "UPDATE COHORT"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCohortModal;
