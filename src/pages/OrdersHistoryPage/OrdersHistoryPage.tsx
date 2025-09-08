import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
} from '@mui/material';

export const OrdersHistoryPage = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField label="Email or Phone" />
        <Button variant="contained">Search</Button>
      </Box>

      <List>
        <ListItem>Order #12345 - $60 - Delivered</ListItem>
        <ListItem>Order #67890 - $40 - Pending</ListItem>
      </List>
    </Box>
  );
};
