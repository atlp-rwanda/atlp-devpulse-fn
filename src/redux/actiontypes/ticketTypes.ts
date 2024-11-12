export interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface ApplicantReply{
   id: string;
   body: string;
   repliedBy: User;
   createdAt: string;
}

export interface AdminReply{
    id: string;
    body: string;
    repliedBy: User;
    createdAt: string;
 }


export interface Ticket {
    _id: string;
    title: string;
    body: string;
    status: 'Open' | 'ApplicantReply' | 'AdminReply' | 'Resolved';
    author: User;
    createdAt: string;
    updatedAt: string;
    adminReplies?: AdminReply[];
    applicantReplies?: ApplicantReply[];

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

export interface ResolveTicketResponse {
    ticket: Ticket;
}
