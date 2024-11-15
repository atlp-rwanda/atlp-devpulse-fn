import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getAllPrograms } from "../../redux/actions/programsActions";
import { getAllCycles } from "../../redux/actions/cyclesActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createCohort, getAllCohorts } from "../../redux/actions/cohortActions";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";

type FormFields = {
  title: string;
  cycle: string;
  program: string;
  phase: string;
  start: string;
  end: string;
};

const AddCohortModal = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const programData = useAppSelector((state: any) => state.programs?.data);
  const cycleData = useAppSelector((state: any) => state.cycles?.data);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>();

  useEffect(() => {
    dispatch(getAllPrograms());
    dispatch(getAllCycles());
  }, [dispatch]);

  if (!open) return null;

  let onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await dispatch(createCohort(data));
      toast.success("Cohort created successfully");
      dispatch(getAllCohorts());
      reset();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to create cohort! Try again");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:">
      <div className=" rounded-lg w-[30%] p-6 relative bg-white dark:bg-dark-frame-bg">
        <div className="flex justify-between items-center mb-6">
         <h2 className="text-black text-xl font-semibold dark:text-white">
            ADD NEW COHORT
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
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 6,
                message: "Cohort title must be at least 6 character",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}

          <select
            className="w-full p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("cycle", { required: "Cycle is required" })}
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
          {errors.cycle && (
            <p className="text-red-500">{errors.cycle?.message}</p>
          )}

          <select
            className="w-full p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("program", { required: "Program is required" })}
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
          {errors.program && (
            <p className="text-red-500">{errors.program?.message}</p>
          )}

          <select
            className="w-full p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("phase", { required: "Phase is required" })}
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
          </select>
          {errors.phase && (
            <p className="text-red-500">{errors.phase?.message}</p>
          )}

          <input
            type="date"
            className="w-full p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("start", { required: "Starting date is required" })}
          />
          {errors.start && (
            <p className="text-red-500">{errors.start?.message}</p>
          )}

          <input
            type="date"
            className="w-full  p-3 rounded bg-transparent border border-gray-600 text-black focus:outline-none dark:text-white"
            {...register("end", { required: "Ending date is required" })}
          />
          {errors.end && <p className="text-red-500">{errors.end?.message}</p>}

          <button
            type="submit"
            className="w-full p-3 flex justify-center items-centerr bg-[#56C870] text-white rounded font-medium hover:bg-green-600 transition-colors"
          >
            {isSubmitting ? (
              <ThreeDots height="20" width="30" color="#ffffff" />
            ) : (
              " ADD COHORT"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCohortModal;
