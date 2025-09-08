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
import { useEffect, useMemo } from 'react';
import type { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import {
  selectCurrentShopId,
  selectIsFlowersLoading,
  selectIsShopsLoading,
  selectShopFlowersPage,
  selectShopPagination,
  selectShops,
} from '../../redux/shops/selectors';
import {
  fetchFlowersPageSmart,
  fetchShops,
} from '../../redux/shops/operations';
import { setCurrentShop } from '../../redux/shops/slice';
import type { RootState } from '../../redux/store';
import { useSearchParams } from 'react-router';
import type { RequestQuery } from '../../types';
import { selectUserData } from '../../redux/user/selectors';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isShopsLoading = useSelector(selectIsShopsLoading);
  const shops = useSelector(selectShops);
  const currentShopId = useSelector(selectCurrentShopId);
  const pagination = useSelector((state: RootState) =>
    selectShopPagination(state, currentShopId || '')
  );

  const user = useSelector(selectUserData);

  const isFlowersLoading = useSelector((state: RootState) =>
    currentShopId ? selectIsFlowersLoading(state, currentShopId) : false
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const query: RequestQuery = useMemo(
    () => ({
      page: parseInt(searchParams.get('page') || '1'),
      perPage: pagination.perPage || 9,
      sortBy: (searchParams.get('sortBy') as 'price' | 'date') || 'date',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc',
    }),
    [pagination, searchParams]
  );
  const emptyArray: [] = [];
  const flowers = useSelector((state: RootState) =>
    currentShopId
      ? selectShopFlowersPage(state, currentShopId, query.page)
      : emptyArray
  );
  useEffect(() => {
    dispatch(fetchShops())
      .unwrap()
      .then(result => {
        if (result && result.length > 0) {
          dispatch(setCurrentShop(result[0]._id));
        }
      });
  }, [dispatch]);

  const handleShopClick = (shopId: string) => {
    dispatch(setCurrentShop(shopId));
    dispatch(
      fetchFlowersPageSmart({
        query: query,
        shopId,
        phone: user.phone || '',
        email: user.email || '',
      })
    );
    setSearchParams('');
  };

  useEffect(() => {
    if (!currentShopId) return;
    dispatch(
      fetchFlowersPageSmart({
        query: query,
        shopId: currentShopId,
        phone: user.phone || '',
        email: user.email || '',
      })
    );
  }, [dispatch, query, currentShopId, user]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page.toString());
      return newParams;
    });
  };

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
          {isFlowersLoading && (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              Flowers are loading, please wait
            </Grid>
          )}
          {!isFlowersLoading && flowers.length === 0 && (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>{'Shop is empty :('}</Grid>
          )}
          {flowers.map(flower => (
            <Grid key={flower._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <FlowerCard item={flower} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={pagination.totalPages} // from state.shops.inventories[currentShopId]?.pagination.totalPages
          page={pagination.page || 1}
          onChange={handlePageChange}
          sx={{ mt: 2 }}
        />
      </Grid>
    </Grid>
  );
};
