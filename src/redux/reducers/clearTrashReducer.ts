import { BsPause } from "react-icons/bs";
import { EMPTYING_TRASH } from "..";
const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
};
export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case EMPTYING_TRASH:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    default:
      return state;
  }
};
