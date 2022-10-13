import axios from './axiosconfig';
import { Dispatch } from 'redux';
import { DeleteActionType, Action } from '../actiontypes/deleteApplicationCycleType';


export const deleteApplicationCycle = (applicationCycleId: string) => {
    
    return async (dispatch:Dispatch<Action>) => {
        dispatch({
            type:DeleteActionType.DELETE_APPLICATION_CYLCLE_LOADING
        });

        try {
            axios.post(
                '/',
                {
                    query: `mutation deleteApplicationCycle($deleteApplicationCycleId: ID!) {
                        deleteApplicationCycle(ID: $deleteApplicationCycleId) {
                            id
                            name
                            startDate
                            endDate
                        }
                    }`,
                    variables: {
                        deleteApplicationCycleId:applicationCycleId
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
                if (res.data.data) dispatch({type:DeleteActionType.DELETE_APPLICATION_CYLCLE_SUCCESS,message:res.data.data.deleteApplicationCycle.name})
                if (res.data.errors) {
                    var mess
                    res.data.errors.map((b:any) => {mess =b.message})
                    console.log(mess)
                    dispatch({type:DeleteActionType.DELETE_APPLICATION_CYLCLE_FAIL,error:mess});
                }
            })
            .catch((err) => {
                dispatch({type:DeleteActionType.DELETE_APPLICATION_CYLCLE_FAIL,
                    error:err.message
                });
            })
        } catch (err:any) {
            dispatch({
                type:DeleteActionType.DELETE_APPLICATION_CYLCLE_FAIL,
                error: err.message
            });

        }
    }
}