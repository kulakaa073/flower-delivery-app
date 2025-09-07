import type { RootState } from '../store';

export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrderById = (state: RootState, orderId: string) =>
  state.orders.items.find(item => item.id === orderId);
export const selectOrdersIsLoading = (state: RootState) =>
  state.orders.isLoading;
