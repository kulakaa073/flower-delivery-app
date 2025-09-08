import { Box, Typography, List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectOrderById } from '../../redux/orders/selectors';
import { useParams } from 'react-router';
import type { AppDispatch, RootState } from '../../redux/store';
import { fetchOrderById } from '../../redux/orders/operations';

export const OrderDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderId } = useParams();
  const order = useSelector((state: RootState) =>
    selectOrderById(state, orderId || '')
  );

  if (!order) {
    dispatch(fetchOrderById(orderId || ''));
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order #{order?._id}
      </Typography>

      <Typography>Address: {order?.deliveryAddress}</Typography>
      <Typography>Date: {order?.createdAt?.toLocaleString()}</Typography>

      <List sx={{ mt: 2 }}>
        {order?.items.map(item => (
          <ListItem>{`${
            item.flowerId /*i dont have enough power to add name at this point, tbh*/
          } x ${item.count} - $ ${item.priceAtPurchase}`}</ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: $ {order?.total}
      </Typography>
    </Box>
  );
};
