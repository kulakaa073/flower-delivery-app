import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Cart
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            Orders
          </Button>
          <Button color="inherit" component={Link} to="/coupons">
            Coupons
          </Button>
        </Box>
      </Toolbar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button color="inherit">Sort by price</Button>
          <Button color="inherit">Sort by date added</Button>
          <Button color="inherit">Ascending</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
