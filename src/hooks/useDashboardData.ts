import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAlltraineeapplicants } from "../redux/actions/filterTraineeActions";
import { getAllCohorts } from "../redux/actions/cohortActions";
import { getAllCoordinators } from "../redux/actions/users";
import { getAllPrograms } from "../redux/actions/programsActions";

type PerformanceMetric = {
  name: string;
  performance: number;
};

export const useDashboardData = () => {
  const [traineeCount, setTraineeCount] = useState(0);
  const [cohortCount, setCohortCount] = useState(0);
  const [coordinatorCount, setCoordinatorCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);
  const [averagePerformance, setAveragePerformance] = useState(0);
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>(
    []
  );
  const [currentDate, setCurrentDate] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainees = await dispatch(getAlltraineeapplicants());
        const cohorts = await dispatch(getAllCohorts());
        const coordinators = await dispatch(getAllCoordinators());
        const programs = await dispatch(getAllPrograms());
        setTraineeCount(trainees);
        setCohortCount(cohorts);
        setCoordinatorCount(coordinators);
        setProgramCount(programs);

        const performanceMetric: PerformanceMetric[] = [
          { name: "0", performance: trainees / coordinators },
          { name: "1", performance: trainees / programs },
          { name: "2", performance: cohorts / programs },
          { name: "3", performance: programs / coordinators },
          { name: "4", performance: trainees / cohorts },
          { name: "5", performance: coordinators / cohorts },
          { name: "6", performance: programs / trainees },
          { name: "7", performance: coordinators / programs },
          { name: "8", performance: programs / cohorts },
          { name: "9 Sprint", performance: coordinators / trainees },
        ];
        setPerformanceData(performanceMetric);
        const totalPerformance = performanceMetric.reduce(
          (acc, curr) => acc + curr.performance,
          0
        );
        setAveragePerformance(totalPerformance / performanceMetric.length);
      } catch (error) {}
    };
    const formatDate = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString(undefined, options);
    };
    setCurrentDate(formatDate());
    fetchData();
  }, [dispatch]);
  return {
    traineeCount,
    cohortCount,
    coordinatorCount,
    programCount,
    performanceData,
    averagePerformance,
    currentDate,
  };
};
