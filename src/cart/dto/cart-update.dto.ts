export class CartItemUpdateDto {
  productId: number;
  quantity: number;
}

export type CartUpdateDto = CartItemUpdateDto[];
