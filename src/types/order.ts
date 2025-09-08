export interface OrderedFlower {
  flowerId: string;
  count: number;
  priceAtPurchase: number;
}

export interface NamedOrderedFlower extends OrderedFlower {
  name: string;
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

export interface NewOrder {
  items: Array<NamedOrderedFlower>;
  total: number;
  deliveryAddress: string;
  shopId: string;
  email: string;
  phone: string;
}

export interface CreateOrderRequest {
  items: Array<OrderedFlower>;
  total: number;
  deliveryAddress: string;
  shopId: string;
  phone: string;
  email: string;
}
