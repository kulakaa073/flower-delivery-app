import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { shopsReducer } from './shops/slice';
import { ordersReducer } from './orders/slice';
import { usersReducer } from './user/slice';
import { couponsReducer } from './coupons/slice';

const userPersistConfig = { key: 'user', storage };
const ordersPersistConfig = { key: 'order', storage, whitelist: ['newOrder'] };

const userPersistReducer = persistReducer(userPersistConfig, usersReducer);
const ordersPersistReducer = persistReducer(ordersPersistConfig, ordersReducer);

export const store = configureStore({
  reducer: {
    shops: shopsReducer,
    orders: ordersPersistReducer,
    user: userPersistReducer,
    coupons: couponsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
