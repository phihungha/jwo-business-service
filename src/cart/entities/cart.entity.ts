export class CartItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  linePrice: number;
}

export type Cart = CartItem[];
