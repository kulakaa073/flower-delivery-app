import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ShoppingCartPage = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Shopping Cart
      </Typography>

      {/* Cart Items */}
      <List>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          <Typography>Rose Bouquet x2 - $40</Typography>
        </ListItem>
      </List>

      {/* User Info */}
      <Box component="form" sx={{ mt: 3 }}>
        <TextField fullWidth label="Email" sx={{ mb: 2 }} />
        <TextField fullWidth label="Phone" sx={{ mb: 2 }} />
        <TextField fullWidth label="Delivery Address" sx={{ mb: 2 }} />
        <Button variant="contained" fullWidth>
          Submit Order
        </Button>
      </Box>
    </Box>
  );
};
