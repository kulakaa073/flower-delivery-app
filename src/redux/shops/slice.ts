import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchShops, fetchShopInventory } from './operations';

import type { ShopInventoryResponse } from '../../types';
import type { ShopsState, ShopInventoryState, Shop } from '../../types/shop';

const createEmptyInventoryState = (): ShopInventoryState => ({
  items: {},
  pagination: {
    page: 1,
    perPage: 9,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
    totalItems: 0,
  },
  loading: false,
  error: null,
  loadedPages: [],
  lastUpdated: 0,
});

const initialState: ShopsState = {
  shops: [],
  isLoading: false,
  error: null,
  inventories: {},
  currentShopId: null,
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
    setCurrentShop: (state, action: PayloadAction<string>) => {
      state.currentShopId = action.payload;
      if (!state.inventories[action.payload]) {
        state.inventories[action.payload] = createEmptyInventoryState();
      }
    },
    setCurrentPageForShop: (
      state,
      action: PayloadAction<{ shopId: string; page: number }>
    ) => {
      const { shopId, page } = action.payload;
      if (!state.inventories[shopId]) {
        state.inventories[shopId] = createEmptyInventoryState();
      }
      state.inventories[shopId].pagination.page = page;
    },
    clearInventoryForShop: (state, action: PayloadAction<string>) => {
      const shopId = action.payload;
      if (state.inventories[shopId]) {
        state.inventories[shopId].items = {};
        state.inventories[shopId].loadedPages = [];
        state.inventories[shopId].lastUpdated = 0;
      }
    },
    clearAllInventories: state => {
      state.inventories = {};
    },
    clearStaleInventories: state => {
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      Object.keys(state.inventories).forEach(shopId => {
        const inventory = state.inventories[shopId];
        if (inventory.lastUpdated < fiveMinutesAgo) {
          inventory.items = {};
          inventory.loadedPages = [];
          inventory.lastUpdated = 0;
        }
      });
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
      .addCase(fetchShopInventory.pending, (state, action) => {
        const { shopId } = action.meta.arg;
        if (!state.inventories[shopId]) {
          state.inventories[shopId] = createEmptyInventoryState();
        }
        state.inventories[shopId].loading = true;
        state.inventories[shopId].error = null;
      })
      .addCase(fetchShopInventory.fulfilled, (state, action) => {
        const shopId = action.meta.arg.shopId;
        const { data, ...pagination } = action.payload as ShopInventoryResponse;
        const inventory = state.inventories[shopId];
        if (inventory) {
          inventory.items[pagination.page] = data;
          if (!inventory.loadedPages.includes(pagination.page)) {
            inventory.loadedPages.push(pagination.page);
          }
          inventory.pagination = pagination;
          inventory.loading = false;
          inventory.error = null;
          inventory.lastUpdated = Date.now();
        }
      })
      .addCase(fetchShopInventory.rejected, (state, action) => {
        const { shopId } = action.meta.arg;
        const inventory = state.inventories[shopId];
        if (inventory) {
          inventory.loading = false;
          inventory.error = action.payload ?? 'Failed to load inventory';
        }
      });
  },
});

export const {
  setCurrentShop,
  setCurrentPageForShop,
  clearInventoryForShop,
  clearAllInventories,
  clearStaleInventories,
} = slice.actions;

export const shopsReducer = slice.reducer;
