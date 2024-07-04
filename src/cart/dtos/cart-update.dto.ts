import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';

export class CartItemUpdateDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

export class CartUpdateDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemUpdateDto)
  items: CartItemUpdateDto[];
}
