import { Action, RestoreActionType } from '../actiontypes/restoreTrainee';

interface State {
    success: boolean;
    loading: boolean;
    error: any;
    message: any;
}

const initialState ={
    loading: false,
    success: false,
    error: null,
    message: null,
}

const restoretraineReducer = (state: State = initialState, action: Action):State => {
    switch(action.type) {
        case RestoreActionType.RESTORE_TRAINE_LOADING:
            return {
                loading: true,
                success: false,
                error: null  ,
                message:null,
            } 
        case RestoreActionType.RESTORE_TRAINE_SUCCESS:
            return {
                ...state,
                message:action.message,
            }
        case RestoreActionType.RESTORE_TRAINE_FAIL:

            return {
                ...state,
                error: action.error,
               
            }
        default: 
            return state;
    }
}


export default restoretraineReducer;