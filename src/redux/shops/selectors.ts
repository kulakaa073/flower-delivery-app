import type { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectShops = (state: RootState) => state.shops.shops;
export const selectShopInventory = (state: RootState) =>
  state.shops.shopInventory;
export const selectPaginationDta = (state: RootState) => state.shops.pagination;

export const selectCurrentPageFlowers = createSelector(
  [
    (state: RootState) => state.flowers.items,
    (state: RootState) => state.flowers.currentPage,
  ],
  (items, currentPage) => items[currentPage] || []
);

export const selectIsPageLoaded = createSelector(
  [
    (state: RootState) => state.flowers.loadedPages,
    (_: RootState, page: number) => page,
  ],
  (loadedPages, page) => loadedPages.has(page)
);

export const selectPaginationInfo = createSelector(
  [(state: RootState) => state.flowers],
  flowers => ({
    currentPage: flowers.currentPage,
    totalPages: flowers.totalPages,
    totalItems: flowers.totalItems,
    perPage: flowers.perPage,
    hasNextPage: flowers.currentPage < flowers.totalPages,
    hasPreviousPage: flowers.currentPage > 1,
  })
);
