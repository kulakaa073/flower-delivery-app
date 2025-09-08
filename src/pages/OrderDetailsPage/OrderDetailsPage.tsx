import { Box, Typography, List, ListItem } from '@mui/material';

export const OrderDetailsPage = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order #12345
      </Typography>
      <Typography>Email: user@example.com</Typography>
      <Typography>Phone: +123456789</Typography>
      <Typography>Address: 123 Main St</Typography>
      <Typography>Date: 2025-09-08 14:30</Typography>

      <List sx={{ mt: 2 }}>
        <ListItem>Rose Bouquet x2 - $40</ListItem>
        <ListItem>Tulip x3 - $20</ListItem>
      </List>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: $60
      </Typography>
    </Box>
  );
};
