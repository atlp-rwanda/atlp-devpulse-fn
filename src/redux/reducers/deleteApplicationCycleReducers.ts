import { Action, DeleteActionType} from '../actiontypes/deleteApplicationCycleType';

interface State {
    success: boolean;
    loading: boolean;
    error: any;
    message: any;
}

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: null
}

const deleteApplicationCycleReducer = (state: State = initialState, action: Action):State => {
    switch(action.type) {
        case DeleteActionType.DELETE_APPLICATION_CYLCLE_LOADING:
            return {
                loading: true,
                success: false,
                error: null  ,
                message:null,
            } 
        case DeleteActionType.DELETE_APPLICATION_CYLCLE_SUCCESS:
            return {
                ...state,
                message:action.message,
            }
        case DeleteActionType.DELETE_APPLICATION_CYLCLE_FAIL:

            return {
                ...state,
                error: action.error,
               
            }
        default: 
            return state;
    }
}

export default deleteApplicationCycleReducer;