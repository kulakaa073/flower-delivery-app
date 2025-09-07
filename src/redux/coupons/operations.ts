import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../utils/axiosUtils';
import type { Coupon } from '../../types/coupon';

export const fetchCoupons = createAsyncThunk<
  Coupon[], // payload return type
  void, // argument type
  { rejectValue: string } // reject type
>('coupons/fetchCoupons', async (_, thunkAPI) => {
  try {
    const response = await api.post<Coupon[]>(`coupons`);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});
