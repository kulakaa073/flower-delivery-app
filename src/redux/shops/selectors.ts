import type { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectShops = (state: RootState) => state.shops.shops;
export const selectCurrentShopId = (state: RootState) =>
  state.shops.currentShopId;

export const selectShopInventory = createSelector(
  [
    (state: RootState) => state.shops.inventories,
    (_: RootState, shopId: string) => shopId,
  ],
  (inventories, shopId) => inventories[shopId]
);

export const selectCurrentShopInventory = createSelector(
  [
    (state: RootState) => state.shops.inventories,
    (state: RootState) => state.shops.currentShopId,
  ],
  (inventories, currentShopId) =>
    currentShopId ? inventories[currentShopId] : null
);

export const selectShopFlowersPage = createSelector(
  [
    (state: RootState) => state.shops.inventories,
    (_: RootState, shopId: string) => shopId,
    (_: RootState, __: string, page: number) => page,
  ],
  (inventories, shopId, page) => {
    const inventory = inventories[shopId];
    return inventory?.items[page] || [];
  }
);

export const selectIsShopPageLoaded = createSelector(
  [
    (state: RootState) => state.shops.inventories,
    (_: RootState, shopId: string) => shopId,
    (_: RootState, __: string, page: number) => page,
  ],
  (inventories, shopId, page) => {
    const inventory = inventories[shopId];
    return inventory ? inventory.loadedPages.has(page) : false;
  }
);
