import { Ticket } from "./Ticket.type";

export default interface UpdateUser {
    id?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    tickets?: Ticket[]
}