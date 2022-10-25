import { Action, DeleteActionType,softAction,softDeleteActionType } from '../actiontypes/deleteactiontype';

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
const softinitialState ={
    loading: false,
    success: false,
    error: null,
    message: null,
}

const deletetraineReducer = (state: State = initialState, action: Action):State => {
    switch(action.type) {
        case DeleteActionType.DELETE_TRAINE_LOADING:
            return {
                loading: true,
                success: false,
                error: null  ,
                message:null,
            } 
        case DeleteActionType.DELETE_TRAINE_SUCCESS:
            return {
                ...state,
                message:action.message,
            }
        case DeleteActionType.DELETE_TRAINE_FAIL:

            return {
                ...state,
                error: action.error,
               
            }
        default: 
            return state;
    }
}
export const softdeletetraineReducer = (state: State = softinitialState, action: softAction):State => {
    switch(action.type) {
        case softDeleteActionType.softDELETE_TRAINE_LOADING:
            return {
                loading: true,
                success: false,
                error: null  ,
                message:null,
            } 
        case softDeleteActionType.softDELETE_TRAINE_SUCCESS:
            return {
                ...state,
                message:action.message,
            }
        case softDeleteActionType.softDELETE_TRAINE_FAIL:
            return {
                ...state,
                error: action.error,
               
            }
        default: 
            return state;
    }
}

export default deletetraineReducer;