import axios from './axiosconfig';
import { Dispatch } from 'redux';
import { DeleteActionType, Action,softDeleteActionType,softAction } from '../actiontypes/deleteactiontype';

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
                console.log(res)
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
                console.log(res)
                if (res.data.data) dispatch({type: softDeleteActionType.softDELETE_TRAINE_SUCCESS,message:res.data.data.deleteTrainee.email});
                if (res.data.errors) {
                     var mess
                res.data.errors.map((b:any)=>{ mess =b.message})
                console.log(mess)
                dispatch({type: softDeleteActionType.softDELETE_TRAINE_FAIL,error:mess});
                    
                }
                
            })

            .catch(err=>{
                console.log(err)
                dispatch({
                        type: softDeleteActionType.softDELETE_TRAINE_FAIL,
                        error: err.message
               });
            })


        } catch(err:any) {
            dispatch({
                type: softDeleteActionType.softDELETE_TRAINE_FAIL,
                error: err.message
            });
        }
    }
}