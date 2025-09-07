import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchOrderById, fetchOrders, createOrder } from './operations';

import type { Order } from '../../types/order';

interface OrdersState {
  items: Order[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: OrdersState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: OrdersState,
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
      .addCase(fetchOrderById.pending, handlePending)
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.isLoading = false;
          state.error = null;
          state.items.push(action.payload);
        }
      )
      .addCase(fetchOrderById.rejected, handleRejected)
      .addCase(fetchOrders.pending, handlePending)
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.isLoading = false;
          state.error = null;
          state.items.push(...action.payload);
        }
      )
      .addCase(fetchOrders.rejected, handleRejected);
  },
});

export const shopsReducer = slice.reducer;
