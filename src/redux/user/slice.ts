import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchUserData, updateFavourites } from './operations';

import type { User } from '../../types/user';

interface UserState {
  data: User;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: {
    id: undefined,
    email: undefined,
    phone: undefined,
    lastDeliveryAddress: undefined,
    favourites: undefined,
  },
  isLoading: false,
  error: null,
};

const handlePending = (state: UserState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: UserState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload ?? 'Unknown error';
};

const slice = createSlice({
  name: 'shops',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, handlePending)
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, handleRejected)
      .addCase(updateFavourites.pending, handlePending)
      .addCase(
        updateFavourites.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(updateFavourites.rejected, handleRejected);
  },
});

export const usersReducer = slice.reducer;
