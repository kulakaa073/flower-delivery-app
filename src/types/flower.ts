export interface Flower {
  id?: string;
  name: string;
  imageUrl: string;
  price: number;
  isBouquet?: boolean;
  stock: number;
  isFavorite: boolean;
  createdAt: Date;
}
