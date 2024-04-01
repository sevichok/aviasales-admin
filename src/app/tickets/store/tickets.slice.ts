import { createSlice } from "@reduxjs/toolkit";
import { getTickets } from "./tickets.action";

// ======= types ======= //
import { Ticket } from "../types/Ticket.type";

interface AuthState {
    totalCount: number
    tickets: Ticket[]
    pending: {
        tickets: boolean
    },
    errors: {
        tickets: null | string
    }
}

const initialState: AuthState = {
    totalCount: 0,
    tickets: [],
    pending: {
        tickets: false
    },
    errors: {
        tickets: null
    }
};

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.pending.tickets = true;
                state.errors.tickets = null;
            })
            .addCase(getTickets.fulfilled, (state, { payload }) => {
                state.tickets = [...state.tickets, ...payload.tickets];
                state.totalCount = payload.totalTicketCount
                state.pending.tickets = false;
            })
            .addCase(getTickets.rejected, (state, { payload }: any) => {
                state.errors = payload.response.data.message
                state.tickets = []
                state.pending.tickets = false;
            })
    },
});


