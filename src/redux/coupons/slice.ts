import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCoupons } from './operations';

import type { Coupon } from '../../types/coupon';

interface CouponsState {
  items: Coupon[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CouponsState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: CouponsState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: CouponsState,
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
      .addCase(fetchCoupons.pending, handlePending)
      .addCase(
        fetchCoupons.fulfilled,
        (state, action: PayloadAction<Coupon[]>) => {
          state.isLoading = false;
          state.error = null;
          state.items = action.payload;
        }
      )
      .addCase(fetchCoupons.rejected, handleRejected);
  },
});

export const couponsReducer = slice.reducer;
