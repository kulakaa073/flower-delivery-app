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
import type { Flower } from '../../types/flower';
import type { NamedOrderedFlower } from '../../types/order';
import { addItemToOrder } from '../../redux/orders/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCurrentShopId } from '../../redux/shops/selectors';

interface FlowerCardProps {
  item: Flower;
}

export const FlowerCard = ({ item }: FlowerCardProps) => {
  const dispatch = useDispatch();
  const shopId = useSelector(selectCurrentShopId) || '';

  const handleAddToCart = () => {
    const ordered: NamedOrderedFlower = {
      _id: item._id,
      name: item.name,
      count: 1,
      priceAtPurchase: item.price,
    };
    dispatch(addItemToOrder({ ...ordered, shopId }));
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={item.imageUrl}
        alt={item.name}
      />
      <CardContent>
        <Typography variant="subtitle1">{item.name}</Typography>
        <Typography color="text.secondary">${item.price}</Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <Button size="small" variant="contained" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};
