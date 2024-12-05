

// export enum AddActionType {
//     ADD_TRAINE_LOADING = 'ADD_TRAINE_LOADING',
//     ADD_TRAINE_SUCCESS = 'ADD_TRAINE_SUCCESS',
//     ADD_TRAINE_FAIL = 'ADD_TRAINE_FAIL'

// }
// export enum viewActionType {
//     VIEW_TRAINE_LOADING = 'VIEW_TRAINE_LOADING',
//     VIEW_TRAINE_SUCCESS = 'VIEW_TRAINE_SUCCESS',
//     VIEW_TRAINE_FAIL = 'VIEW_TRAINE_FAIL'
    
// }


// interface addactionPending {
//     type: AddActionType.ADD_TRAINE_LOADING;
// }
// interface addactionSuccess {
//     type: AddActionType.ADD_TRAINE_SUCCESS;
//     message: string;
// }


// interface addactionFail {
//     type: AddActionType.ADD_TRAINE_FAIL;
//     error: any;
// }

// interface viewactionPending {
//     type: viewActionType.VIEW_TRAINE_LOADING;
// }
// interface viewactionSuccess {
//     type: viewActionType.VIEW_TRAINE_SUCCESS;
//     message: string;
// }

// interface viewactionFail {
//     type: viewActionType.VIEW_TRAINE_FAIL;
//     error: any;
// }


// export type add = addactionPending  | addactionSuccess | addactionFail;
// export type view = viewactionPending | viewactionSuccess | viewactionFail;

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }

export interface Trainee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    applicationPhase: string;
    user?: User;
    cohort?: {
      id: string;
      title: string;
      program: string;
      cycle: string;
      start: string;
      end: string;
      phase: string;
    };
  }

export const setTrainee = (traineeData) => ({
    type: 'SET_TRAINEE',
    payload: traineeData
  });

  export const setUser = (userData) => ({
    type: 'SET_USER',
    payload: userData
  });
