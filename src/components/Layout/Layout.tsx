import { Header } from '../Header/Header';
import { Outlet } from 'react-router';
import Container from '@mui/material/Container';

export const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh' }}>
        <Outlet />
      </Container>
    </>
  );
};
