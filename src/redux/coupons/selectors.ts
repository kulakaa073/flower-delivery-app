import type { RootState } from '../store';

export const selectCoupon = (state: RootState) => state.coupons.items;
export const selectCouponByCode = (state: RootState, code: string) =>
  state.coupons.items.find(item => item.code === code);
export const selectCouponsIsLoading = (state: RootState) =>
  state.coupons.isLoading;
