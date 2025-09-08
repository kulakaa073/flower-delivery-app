import './App.css';

import { Route, Routes } from 'react-router';
import { Suspense } from 'react';
import { Navigate } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { ShoppingCartPage } from './pages/ShoppingCartPage/ShoppingCartPage';
import { CreateOrderPage } from './pages/CreateOrderPage/CreateOrderPage';
import { OrdersHistoryPage } from './pages/OrdersHistoryPage/OrdersHistoryPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage/OrderDetailsPage';
import { CouponsPage } from './pages/CouponsPage/CouponsPage';

export const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/order" element={<CreateOrderPage />} />
          <Route path="/order/:orderId" element={<OrderDetailsPage />} />
          <Route path="/order/history" element={<OrdersHistoryPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
