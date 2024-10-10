export enum fetchAssessment {
    fetchAssessments = "fetchRoles_success"
  }

  interface fetchCandidateAssessment {
    type: fetchAssessment.fetchAssessments;
    data: any;
  }

  export type  fetchCandidateAssessments = fetchCandidateAssessment;