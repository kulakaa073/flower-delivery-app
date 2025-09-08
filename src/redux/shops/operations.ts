import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Shop } from '../../types/shop';
import type { RequestQuery, ShopInventoryResponse } from '../../types';
import type { RootState } from '../store';
import api from '../../utils/axiosUtils';
import { selectIsShopPageLoaded } from './selectors';
import { setCurrentPageForShop } from './slice';

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
      const queryParams = new URLSearchParams({
        page: query.page.toString(),
        perPage: query.perPage.toString(),
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
      });

      const response = await api.post<ShopInventoryResponse>(
        `shops/${shopId}/flowers?${queryParams.toString()}`,
        {
          phone: phone || undefined,
          email: email || undefined,
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

export const fetchFlowersPageSmart = createAsyncThunk<
  void,
  { query: RequestQuery; shopId: string; phone: string; email: string },
  { rejectValue: string }
>(
  'flowers/fetchPageSmart',
  async ({ query, shopId, phone, email }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const isPageLoaded = selectIsShopPageLoaded(state, shopId, query.page);

    if (!isPageLoaded) {
      await thunkAPI.dispatch(
        fetchShopInventory({ query, shopId, phone, email })
      );
    }

    thunkAPI.dispatch(setCurrentPageForShop({ shopId, page: query.page }));
  }
);
