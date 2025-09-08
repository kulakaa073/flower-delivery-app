import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectOrders } from '../../redux/orders/selectors';
import { fetchOrders } from '../../redux/orders/operations';
import type { AppDispatch } from '../../redux/store';
import { selectUserData } from '../../redux/user/selectors';

export const OrdersHistoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders);
  const userData = useSelector(selectUserData);
  const handleSearch = () => {
    dispatch(fetchOrders(userData || ''));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField label="Email or Phone" />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <List>
        {orders.map(order => (
          <ListItem>
            Order #{order._id} - ${order.total}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
