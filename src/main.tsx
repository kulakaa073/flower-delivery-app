import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize/modern-normalize.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

import { PersistGate } from 'redux-persist/integration/react';

const rootElement = document.getElementById('root') as HTMLElement;
if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
