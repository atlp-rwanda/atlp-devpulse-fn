import { GET_ALL_FILTERED_TICKETS} from "..";

const initialState = {
    loading: false,
    error: null,
    filteredTickets: [],
  };
  
  export default (state = initialState, { type, payload }: any) => {
    switch (type) {
      case GET_ALL_FILTERED_TICKETS:
        return {
          ...state,
          loading: false,
          filteredTickets: payload,
        };
      default:
        return state;
    }
  };
  