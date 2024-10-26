export interface User {
    email: string;
    firstName: string;
    lastName: string;
}

export interface AdminResponse{
    body: string;
    respondedBy: User;
    respondedAt: String;
}

export interface Ticket {
    _id: string;
    title: string;
    body: string;
    status: 'Open' | 'ApplicantReply' | 'AdminReply' | 'Resolved';
    author: User;
    adminResponse?: AdminResponse;

}

export interface GetUserTicketsResponse {
    tickets: Ticket[];
}

export interface CreateTicketResponse {
    ticket: Ticket;
}

export interface UpdateTicketResponse {
    ticket: Ticket;
}

export interface GetAllTicketsResponse {
    tickets: Ticket[];
}

export interface GetTicketResponse {
    ticket: Ticket;
}

