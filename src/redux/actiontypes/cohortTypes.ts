export interface Cohort {
    id: string;
  title: string | null;
  program: string | null;
  cycle: string | null;
  start: string | null;
  end: string | null;
  phase: 'core' | 'team' | 'apprenticeship' | null;
  trainees: string[] | null;
}

export interface CohortData {
    cohort: Cohort[];
  }
