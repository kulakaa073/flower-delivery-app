import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoupons } from '../../redux/coupons/operations';
import type { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import {
  selectCoupon,
  selectCouponsIsLoading,
} from '../../redux/coupons/selectors';

export const CouponsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isCouponsLoading = useSelector(selectCouponsIsLoading);
  const coupons = useSelector(selectCoupon);

  useEffect(() => {
    dispatch(fetchCoupons());
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Copied ${code}`);
  };
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        {isCouponsLoading && <Card>Coupons are loading, please wait</Card>}
        {!isCouponsLoading && coupons.length === 0 && (
          <Card>No coupons found.</Card>
        )}
        {coupons.map(coupon => (
          <Card key={coupon._id}>
            <CardContent>
              <Typography variant="h6">{coupon.discountValue}</Typography>
              <Typography>Code: {coupon.code}</Typography>
              <Typography>
                Valid until: {coupon.validUntil.toLocaleString()}
              </Typography>
              <Button onClick={() => handleCopy(coupon.code)}>Copy Code</Button>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};
