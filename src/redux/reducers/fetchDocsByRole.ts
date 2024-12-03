import { GET_DOCS_BY_ROLE} from "..";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_DOCS_BY_ROLE:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};
