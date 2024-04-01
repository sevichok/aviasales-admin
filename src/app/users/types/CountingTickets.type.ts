import { Ticket } from "./Ticket.type";

export interface CountingTickets {
    totalTicketCount: number,
    tickets: Ticket[],
}