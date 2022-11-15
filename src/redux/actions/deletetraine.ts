import axios from './axiosconfig';
import { Dispatch } from 'react';
import { DeleteActionType, Action,softDeleteActionType,softAction,fetchact,fetchtrainesss } from '../actiontypes/deleteactiontype';
import { toast } from "react-toastify";

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
                                    firstName
                                    lastName
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
                                        firstName
                                        lastName
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
export const fetchtraine = ({ page,itemsPerPage,  All }:any) => {
    return async (dispatch: Dispatch<fetchact>) => {
        try {
            await axios.post( '/',
                     {
                        query: `query AllTrainees($input: pagination) {
                                    allTrainees(input: $input) {
                                        lastName
                                        firstName
                                        _id
                                        email
                                        delete_at
                                        cycle_id {
                                           name
                                        }
                                    }
                                    }`,
                        variables:{
                            input: {
                                page,
                                itemsPerPage,
                                All,
                                },
                        }
                    },
                    {
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    }
                                )
            .then((res)=> {
                if (res.data.data){toast.success("traines fetched successfully") ;dispatch({type: fetchtrainesss.fetchtraines_success,data:res.data.data.allTrainees})};
                if (res.data.errors) {
                     var mess
                res.data.errors.map((b:any)=>{ mess =b.message})
                toast.error(mess)
                dispatch({type: fetchtrainesss.fetchtraines_fail,error:mess});
                }
            })
            .catch(err=> {
                  toast.error(err.message)
                  dispatch({type: fetchtrainesss.fetchtraines_fail,error:err})})
        } catch(err:any) {toast.error(err.message);dispatch({type: fetchtrainesss.fetchtraines_fail,error:err})}
    }
}