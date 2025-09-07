export interface OrderedFlower {
  flowerId: string;
  count: number;
  priceAtPurchase: number;
  id?: string;
}

export interface Order {
  id?: string;
  items: Array<OrderedFlower>;
  total: number;
  deliveryAddress: string;
  shopId: string;
  userId: string;
  createdAt?: Date;
}

export interface CreateOrderRequest {
  items: Array<OrderedFlower>;
  total: number;
  deliveryAddress: string;
  shopId: string;
  phone: string;
  email: string;
}
