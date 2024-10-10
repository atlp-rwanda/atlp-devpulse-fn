export interface Program {
    _id: string;
    title: string;
  }
  
  export interface Cycle {
    id: string;
    name: string;
  }
  
  export interface Cohort {
    id: string;
    title: string;
  }
  
  export interface JobPost {
    _id: string;
    title: string;
    program: Program;
    cycle: Cycle;
    cohort: Cohort;
    description: string;
    published: boolean;
  }
  
  export interface FormData {
    title: string;
    program: string;  // Stores program title
    cycle: string;    // Stores cycle name
    cohort: string;   // Stores cohort title
    description: string;
    published: boolean;
  }
  
  export interface RootState {
    fetchSingleJobPost: {
      data: JobPost | null;
      loading: boolean;
      serverResponded: boolean;
    };
    updateProgram: {
      loading: boolean;
      error: string | null;
    };
    programs: {
      data: Program[];
    };
    cycles: {
      data: Cycle[];
    };
    cohorts: {
      data: Cohort[];
    };
  }
  