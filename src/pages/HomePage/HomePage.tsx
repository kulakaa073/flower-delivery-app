import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Pagination,
  Grid,
} from '@mui/material';
import { FlowerCard } from '../../components/FlowerCard/FlowerCard';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectIsShopsLoading, selectShops } from '../../redux/shops/selectors';
import { fetchShops } from '../../redux/shops/operations';
import { setCurrentShop } from '../../redux/shops/slice';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isShopsLoading = useSelector(selectIsShopsLoading);
  const shops = useSelector(selectShops);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  const handleShopClick = (shopId: string) => dispatch(setCurrentShop(shopId));

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2, maxHeight: 400, overflowY: 'auto' }}>
          <Typography variant="h6">Shops</Typography>
          <List>
            {isShopsLoading && (
              <ListItem>Shops are loading, please wait</ListItem>
            )}
            {shops.length === 0 && <ListItem>No shops found.</ListItem>}
            {shops.map(shop => (
              <ListItem key={shop._id} disablePadding>
                <ListItemButton onClick={() => handleShopClick(shop._id)}>
                  <p>{shop.name}</p>
                  <p>{shop.address}</p>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 9 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Flowers
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FlowerCard />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FlowerCard />
          </Grid>
        </Grid>
        <Pagination count={5} sx={{ mt: 2 }} />
      </Grid>
    </Grid>
  );
};
