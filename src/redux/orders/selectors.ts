import type { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrderById = createSelector(
  [
    (state: RootState) => state.orders.items,
    (_: RootState, orderId: string) => orderId,
  ],
  (orders, orderId) => orders.find(item => item.id === orderId) || null
);
export const selectOrdersIsLoading = (state: RootState) =>
  state.orders.isLoading;
export const selectNewOrder = (state: RootState) => state.orders.newOrder;
export const selectIsOrdersLoading = (state: RootState) =>
  state.orders.isLoading;
