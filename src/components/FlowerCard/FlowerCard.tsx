import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const FlowerCard = () => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/200"
        alt="Flower"
      />
      <CardContent>
        <Typography variant="subtitle1">Rose Bouquet</Typography>
        <Typography color="text.secondary">$20</Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <Button size="small" variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};
