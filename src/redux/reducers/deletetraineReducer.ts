import { Action, DeleteActionType,softAction,softDeleteActionType,fetchact,fetchtrainesss,fetchtrainapplicantscount ,fetchtrainapplicantcount} from '../actiontypes/deleteactiontype';
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
const traineState ={
    loading: false,
    success: false,
    error: null,
    message: null,
}
const CountState = {
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
export const traineReducer = (state: State = traineState, action: fetchact):State => {
    switch(action.type) {

        case fetchtrainesss.fetchtraines_success:
            console.log(action.data)
            return {
                ...state,
                message:action.data,
            }
         case fetchtrainesss.fetchtraines_fail:
            return {
                ...state,
                error:action.error,
            }
        case fetchtrainesss.createtrainee_success:
                // console.log(action.data, "*************");
                // console.log(state.message, "&&&&&&&&&&&&&");
                // console.log([...state.message, action.data], "###################");
                return {
                  ...state,
                  message: [...state.message, action.data],
                };
        case fetchtrainesss.createtrainee_fail:
            return {
                ...state,
                error:action.error,
            }
        default: 
            return state;
    }
}
export const traineCountReducer = (state: State = CountState, action: fetchtrainapplicantscount):State => {
    switch(action.type) {

        case fetchtrainapplicantcount.fetchtrainapplicantcount_success:
            console.log(action.data)
            return {
                ...state,
                message:action.data,
            }
         case fetchtrainapplicantcount.fetchtrainapplicantcount_fail:
            return {
                ...state,
                error:action.error,
            }
 
        default: 
            return state;
    }
}

export default deletetraineReducer;