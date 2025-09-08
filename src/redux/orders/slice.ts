import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchOrderById, fetchOrders, createOrder } from './operations';

import type { NamedOrderedFlower, NewOrder, Order } from '../../types/order';

interface OrdersState {
  items: Order[];
  newOrder: NewOrder;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  newOrder: {
    items: [],
    total: 0,
    deliveryAddress: '',
    shopId: '',
    email: '',
    phone: '',
  },
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
  reducers: {
    addItemToOrder: (
      state,
      action: PayloadAction<NamedOrderedFlower & { shopId: string }>
    ) => {
      const { shopId, ...flower } = action.payload;

      if (state.newOrder.items.length === 0) {
        state.newOrder.shopId = shopId;
      }

      const existing = state.newOrder.items.find(
        item => item._id === flower._id
      );

      if (existing) {
        existing.count += flower.count;
      } else {
        state.newOrder.items.push(flower);
      }

      state.newOrder.total = state.newOrder.items.reduce(
        (sum, item) => sum + item.count * item.priceAtPurchase,
        0
      );
    },

    removeItemFromOrder: (state, action: PayloadAction<string>) => {
      state.newOrder.items = state.newOrder.items.filter(
        item => item._id !== action.payload
      );

      state.newOrder.total = state.newOrder.items.reduce(
        (sum, item) => sum + item.count * item.priceAtPurchase,
        0
      );
    },
  },
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
      .addCase(fetchOrders.rejected, handleRejected)
      .addCase(createOrder.pending, handlePending)
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
        state.newOrder = initialState.newOrder;
      })
      .addCase(createOrder.rejected, handleRejected);
  },
});

export const ordersReducer = slice.reducer;

export const { addItemToOrder, removeItemFromOrder } = slice.actions;
