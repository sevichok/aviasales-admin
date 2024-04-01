import { createAsyncThunk } from '@reduxjs/toolkit';

// ======= utils, types ======= //
import repository from 'src/repository';
import { User } from '../types/User.type';
import UpdateUser from '../types/UpdateUser.type';
import { CountingUser } from '../types/CountingUser.type';

export const getUsers = createAsyncThunk<CountingUser, number>(
  'Get/users',
  async (page, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/user?pageNumber=${page}&pageSize=5`);
      return response.data;

    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getFirstUsers = createAsyncThunk<CountingUser, number>(
    'Get/first-users',
    async (page, { rejectWithValue }) => {
        try {
            const response = await repository.get(`/user?pageNumber=${page}&pageSize=5`);
            return response.data;

        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const getUsersBySearch = createAsyncThunk<User[], string>(
  'Get/search_users',
  async (searchString, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/user/search?q=${searchString}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk<User, string>(
  'Get/user',
  async (id, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/user/current/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<User, UpdateUser>(
  'Post/updateUser',
  async (body, { rejectWithValue }) => {
    try {
      const response = await repository.post(`/user`, body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
