import creator from "./creator";
import { INCREMENT, DECREMENT } from "..";
import { toast } from "react-toastify";

export const increment = () => async (dispatch: any) => {
  dispatch(creator(INCREMENT, null));
};

export const decrement = () => async (dispatch: any) => {
  dispatch(creator(DECREMENT, null));
};
