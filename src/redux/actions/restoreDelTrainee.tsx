import axios from './axiosconfig';
import { Dispatch } from 'react';
import { RestoreActionType, Action  } from '../actiontypes/restoreTrainee';
import { toast } from "react-toastify";

export const restoretraine = (traineId: string) => {
    console.log(traineId)
    return async (dispatch:Dispatch<Action>) => {
        dispatch({
            type: RestoreActionType.RESTORE_TRAINE_LOADING
        });

        try {

            axios.post(
                     '/',

                     {
                        query: `mutation SoftRecover($input: softRecover) {
                            softRecover(input: $input) {
                                    id
                                    email
                                 
                                }
                                }`,
                        variables: {
                            "input": {
                            id:traineId
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
                if (res.data.data) dispatch({type: RestoreActionType.RESTORE_TRAINE_SUCCESS,message:res.data.data.softRecover.email});
                toast.success("Trainee Restored successfuly.");
                if (res.data.errors) {
                        var mess
                res.data.errors.map((b:any)=>{ mess =b.message})
                toast.error(mess);
                console.log(mess)
                dispatch({type: RestoreActionType.RESTORE_TRAINE_FAIL,error:mess});

                }
                
            })
            .catch(err=>{
                console.log(err)
                dispatch({
                        type: RestoreActionType.RESTORE_TRAINE_FAIL,
                        error: err.message
               });
            })


        } catch(err:any) {
            dispatch({
                type: RestoreActionType.RESTORE_TRAINE_FAIL,
                error: err.message
            });
        }
    }
}

