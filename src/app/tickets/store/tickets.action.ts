import { createAsyncThunk } from '@reduxjs/toolkit';

// ======= utils, types ======= //
import repository from 'src/repository';
import { Ticket } from '../types/Ticket.type';
import { CountingTickets } from 'src/app/users/types/CountingTickets.type';

export const getTickets = createAsyncThunk<CountingTickets, number>(
  'Get/tickets',
  async (page, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/ticket?pageNumber=${page}&pageSize=10`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
