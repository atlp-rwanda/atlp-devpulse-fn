import { GET_USER_TICKETS, UPDATE_TICKET, CREATE_TICKET, GET_ALL_TICKETS, GET_TICKET, RESOLVE_TICKET } from "..";
import { Ticket } from "redux/actiontypes/ticketTypes";

interface TicketState {
    tickets: Ticket[];
    currentTicket: Ticket | null;
    loading: boolean;
    error: string | null;
}

const initialState: TicketState = {
    tickets: [],
    currentTicket: null,
    loading: false,
    error: null,
};

export const ticketReducer = (state = initialState, action: any) => {
    const safeState = {
        ...state,
        tickets: Array.isArray(state.tickets) ? state.tickets : []
    };
    
    switch (action.type) {
        case GET_USER_TICKETS:
            return {
                ...state,
                tickets: action.payload,
                loading: false,
                error: null,
            };
        
        case CREATE_TICKET:
            return {
                ...state,
                tickets: [...state.tickets, action.payload],
                loading: false,
                error: null,
            };

        case UPDATE_TICKET:
            return {
                ...state,
                tickets: state.tickets.map(ticket =>
                    ticket._id === action.payload._id ? action.payload : ticket
                ),
                currentTicket: state.currentTicket?._id === action.payload._id 
                    ? action.payload 
                    : state.currentTicket,
                loading: false,
                error: null,
            };

        case GET_ALL_TICKETS:
            return {
                ...state,
                tickets: action.payload,
                loading: false,
                error: null,
            }
        
        case GET_TICKET:
            return {
                ...state,
                currentTicket: {
                    ...action.payload,
                    _id: action.payload.id
                },
                loading: false,
                error: null,
            }

        case RESOLVE_TICKET:
            return {
                ...state,
                tickets: state.tickets.map(ticket =>
                    ticket._id === action.payload._id ? action.payload : ticket
                ),
                currentTicket: state.currentTicket?._id === action.payload._id 
                    ? action.payload 
                    : state.currentTicket,
                loading: false,
                error: null,
            }

        default:
            return state;
    }
}