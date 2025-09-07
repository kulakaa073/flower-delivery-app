import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchShops, fetchShopInventory } from './operations';

import type { Shop } from '../../types/shop';
import type { ShopInventoryResponse } from '../../types';

interface ShopsState {
  shops: Shop[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ShopsState = {
  shops: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: ShopsState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: ShopsState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload ?? 'Unknown error';
};

const slice = createSlice({
  name: 'shops',
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.shops.inventory.pagination.page = action.payload;
    },
    clearCache: state => {
      state.shops.inventory = {};
      state.loadedPages = new Set();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchShops.pending, handlePending)
      .addCase(fetchShops.fulfilled, (state, action: PayloadAction<Shop[]>) => {
        state.isLoading = false;
        state.error = null;
        state.shops = action.payload;
      })
      .addCase(fetchShops.rejected, handleRejected)
      .addCase(fetchShopInventory.pending, handlePending)
      .addCase(
        fetchShopInventory.fulfilled,
        (state, action: PayloadAction<ShopInventoryResponse>) => {
          const { data, ...pagination } = action.payload;
          state.isLoading = false;
          state.error = null;
          state.shopInventory = data;
          state.pagination = pagination;
        }
      )
      .addCase(fetchShopInventory.rejected, handleRejected);
  },
});

export const shopsReducer = slice.reducer;
