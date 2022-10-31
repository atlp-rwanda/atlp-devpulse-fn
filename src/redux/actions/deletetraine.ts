import axios from './axiosconfig';
import { Dispatch } from 'redux';
import { DeleteActionType, Action,softDeleteActionType,softAction,fetchact,fetchtrainesss } from '../actiontypes/deleteactiontype';


export const deletetraine = (traineId: string) => {
    
    return async (dispatch:Dispatch<Action>) => {
        dispatch({
            type: DeleteActionType.DELETE_TRAINE_LOADING
        });

        try {

            axios.post(
                     '/',

                     {
                        query: `mutation DeleteTrainee($deleteTraineeId: ID!) {
                                deleteTrainee(id: $deleteTraineeId) {
                                    id
                                    email
                                    firstname
                                    lastname
                                }
                                }`,
                        variables: {
                               deleteTraineeId:traineId
                            }
                    },
                    {
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    }
                                )
            .then((res)=> {
                if (res.data.data) dispatch({type: DeleteActionType.DELETE_TRAINE_SUCCESS,message:res.data.data.deleteTrainee.email});
                if (res.data.errors) {
                var mess
                res.data.errors.map((b:any)=>{ mess =b.message})
                console.log(mess)
                dispatch({type: DeleteActionType.DELETE_TRAINE_FAIL,error:mess});

                }
                
            })
            .catch(err=>{
                dispatch({
                        type: DeleteActionType.DELETE_TRAINE_FAIL,
                        error: err.message
               });
            })


        } catch(err:any) {
            dispatch({
                type: DeleteActionType.DELETE_TRAINE_FAIL,
                error: err.message
            });
        }
    }
}

//soft delete a traine

export const softdeletetraine = (traineId: string) => {
    return async (dispatch: Dispatch<softAction>) => {
        dispatch({
            type: softDeleteActionType.softDELETE_TRAINE_LOADING
        });
        try {
            await axios.post( '/',
                     {
                        query: `mutation SoftdeleteTrainee($input: softdeleteTrainee) {
                                    softdeleteTrainee(input: $input) {
                                        id
                                        email
                                        firstname
                                        lastname
                                    }
                                    }`,
                        variables: {
                                    "input": {
                                        "id": traineId
                                    }
                                    }
                    },
                    {
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    }
                                )
            .then((res)=> {
                const bbb= res.data.data.softdeleteTrainee.email +" "+ res.data.data.softdeleteTrainee.firstname
                if (res.data.data) dispatch({type: softDeleteActionType.softDELETE_TRAINE_SUCCESS,message:bbb});
                if (res.data.errors) {
                     var mess
                res.data.errors.map((b:any)=>{ mess =b.message})
                dispatch({type: softDeleteActionType.softDELETE_TRAINE_FAIL,error:mess});
                }
                
            })
            .catch(err=>{dispatch({type: softDeleteActionType.softDELETE_TRAINE_FAIL,error: err.message});
            })
        } catch(err:any) {dispatch({type: softDeleteActionType.softDELETE_TRAINE_FAIL,error: err.message});}
    }
}
export const fetchtraine = () => {
    return async (dispatch: Dispatch<fetchact>) => {
        try {
            await axios.post( '/',
                     {
                        query: `query GetAllTrainees {
                                getAllTrainees {
                                    id
                                    email
                                    firstName
                                    lastName
                                    delete_at
                                }
                                }`,
                    },
                    {
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    }
                                )
            .then((res)=> {
                if (res.data.data) dispatch({type: fetchtrainesss.fetchtraines_success,data:res.data.data.getAllTrainees});
                if (res.data.errors) {
                     var mess
                res.data.errors.map((b:any)=>{ mess =b.message})
                dispatch({type: fetchtrainesss.fetchtraines_fail,error:mess});
                }
            })
            .catch(err=> {dispatch({type: fetchtrainesss.fetchtraines_fail,error:err})})
        } catch(err:any) {dispatch({type: fetchtrainesss.fetchtraines_fail,error:err})}
    }
}