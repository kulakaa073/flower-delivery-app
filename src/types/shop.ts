import type { Flower } from './flower';
import type { Pagination } from '.';

export interface Location {
  lat: number;
  lng: number;
}

export interface Shop {
  _id: string;
  name: string;
  address: string;
  location: Location;
}

export interface ShopInventoryState {
  items: Record<number, Flower[]>;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  loadedPages: number[];
  lastUpdated: number;
}

export interface ShopsState {
  shops: Shop[];
  isLoading: boolean;
  error: string | null;
  inventories: Record<string, ShopInventoryState>;
  currentShopId: string | null;
}
