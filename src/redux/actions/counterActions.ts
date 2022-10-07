import creator from "./creator";
import { INCREMENT, DECREMENT } from "..";
import { toast } from "react-toastify";

export const increment = () => async (dispatch: any) => {
  try {
    dispatch(creator(INCREMENT, null));
  } catch (error) {
    if (error) {
      return toast.error("error");
    }
  }
};

export const decrement = () => async (dispatch: any) => {
  try {
    dispatch(creator(DECREMENT, null));
  } catch (error) {
    if (error) {
      return toast.error("error");
    }
  }
};
