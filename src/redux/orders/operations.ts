import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../utils/axiosUtils';
import type { CreateOrderRequest, Order } from '../../types/order';

export const fetchOrderById = createAsyncThunk<
  Order, // payload return type
  string, // argument type
  { rejectValue: string } // reject type
>('orders/fetchOrderById', async (orderId, thunkAPI) => {
  try {
    const response = await api.get<Order>(`orders/${orderId}`);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

export const fetchOrders = createAsyncThunk<
  Order[], // payload return type
  { phone?: string; email?: string }, // argument type
  { rejectValue: string } // reject type
>('orders/fetchOrders', async (userData, thunkAPI) => {
  try {
    const response = await api.post<Order[]>(`orders`, userData);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

export const createOrder = createAsyncThunk<
  Order, // payload return type
  CreateOrderRequest, // argument type
  { rejectValue: string } // reject type
>('orders/createOrder', async (orderData, thunkAPI) => {
  try {
    const response = await api.post<Order>(`orders`, orderData);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});
