import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

export const CouponsPage = () => {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Copied ${code}`);
  };
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">10% Off</Typography>
            <Typography>Code: SAVE10</Typography>
            <Button onClick={() => handleCopy('SAVE10')}>Copy Code</Button>
          </CardContent>
        </Card>
      </Grid>
      {/* More coupons... */}
    </Grid>
  );
};
