import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Shop } from '../../types/shop';
import type { RequestQuery, ShopInventoryResponse } from '../../types';

import api from '../../utils/axiosUtils';

export const fetchShops = createAsyncThunk<
  Shop[], // payload return type
  void, // argument type
  { rejectValue: string } // reject type
>('shops/fetchShops', async (_, thunkAPI) => {
  try {
    const response = await api.get<Shop[]>('shops');
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

export const fetchShopInventory = createAsyncThunk<
  ShopInventoryResponse,
  { query: RequestQuery; shopId: string; phone: string; email: string },
  { rejectValue: string }
>(
  'shops/fetchShopInventory',
  async ({ query, shopId, phone, email }, thunkAPI) => {
    try {
      const response = await api.post<ShopInventoryResponse>(
        `shops/${shopId}/flowers`,
        {
          phone,
          email,
          params: query,
        }
      );
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);
