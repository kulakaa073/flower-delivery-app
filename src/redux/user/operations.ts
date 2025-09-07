import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../utils/axiosUtils';
import type { User } from '../../types/user';

export const fetchUserData = createAsyncThunk<
  User, // payload return type
  { phone?: string; email?: string }, // argument type
  { rejectValue: string } // reject type
>('users/fetchUserData', async (userData, thunkAPI) => {
  try {
    const response = await api.post<User>(`user`, userData);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

export const updateFavourites = createAsyncThunk<
  User,
  { phone?: string; email?: string; favourites: string[] },
  { rejectValue: string }
>('users/updateFavourites', async (userData, thunkAPI) => {
  try {
    const response = await api.post<User>(`favourites`, userData);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});
