import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNewOrder,
  selectIsOrdersLoading,
} from '../../redux/orders/selectors';
import { removeItemFromOrder } from '../../redux/orders/slice';
import { createOrder } from '../../redux/orders/operations';
import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import type { CreateOrderRequest } from '../../types/order';
import type { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router';

interface FormValues {
  email: string;
  phone: string;
  deliveryAddress: string;
}

const initialValues: FormValues = {
  email: '',
  phone: '',
  deliveryAddress: '',
};

const orderValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[+]?[\d\s\-()]+$/, 'Invalid phone number')
    .min(10, 'Phone number must be at least 10 characters')
    .required('Phone is required'),
  deliveryAddress: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .required('Delivery address is required'),
});

export const ShoppingCartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const orderData = useSelector(selectNewOrder);
  const isLoading = useSelector(selectIsOrdersLoading);

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItemFromOrder(itemId));
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      setStatus(null);

      if (orderData.items.length === 0) {
        setStatus({
          type: 'error',
          message: 'Cart is empty. Add items before ordering.',
        });
        return;
      }

      const orderRequest: CreateOrderRequest = {
        items: orderData.items.map(({ name, ...item }) => item),
        total: orderData.total,
        deliveryAddress: values.deliveryAddress,
        shopId: orderData.shopId,
        email: values.email,
        phone: values.phone,
      };

      const response = await dispatch(createOrder(orderRequest)).unwrap();

      setStatus({ type: 'success', message: 'Order created successfully!' });
      resetForm();

      navigate(`/orders/${response._id}`);
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Failed to create order',
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Shopping Cart
      </Typography>

      <List>
        {orderData.items.length === 0 && (
          <ListItem>You havent added anything yet. Happy shopping!</ListItem>
        )}
        {orderData.items.map(item => (
          <ListItem
            key={item.flowerId}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveItem(item.flowerId)}
              >
                <DeleteIcon />
              </IconButton>
            }
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography>{item.name}</Typography>
            <Typography>Count:{item.count}</Typography>
            <Typography>Price:{item.priceAtPurchase}</Typography>
          </ListItem>
        ))}
      </List>

      {orderData.items.length > 0 && (
        <Box sx={{ mt: 2, mb: 3 }}>
          <Typography variant="h6">
            Total: ${orderData.total.toFixed(2)}
          </Typography>
        </Box>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={orderValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          status,
        }) => (
          <Form>
            <Box sx={{ mt: 3 }}>
              {status && (
                <Alert severity={status.type} sx={{ mb: 2 }}>
                  {status.message}
                </Alert>
              )}

              <TextField
                fullWidth
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                name="phone"
                label="Phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                name="deliveryAddress"
                label="Delivery Address"
                multiline
                rows={3}
                value={values.deliveryAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.deliveryAddress && Boolean(errors.deliveryAddress)
                }
                helperText={touched.deliveryAddress && errors.deliveryAddress}
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={
                  isSubmitting || isLoading || orderData.items.length === 0
                }
                startIcon={
                  isSubmitting || isLoading ? (
                    <CircularProgress size={20} />
                  ) : null
                }
              >
                {isSubmitting || isLoading
                  ? 'Creating Order...'
                  : 'Submit Order'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
