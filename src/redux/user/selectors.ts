import type { RootState } from '../store';

export const selectUserData = (state: RootState) => state.user.data;
export const selectUserFavourites = (state: RootState) =>
  state.user.data?.favourites;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
