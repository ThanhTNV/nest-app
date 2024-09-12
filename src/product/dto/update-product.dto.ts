const REG_NAME =
  /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+((\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)+)?$/;
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsNumber, IsInt, Matches } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // Add additional fields here
  @IsString({ message: 'Name must be a string' })
  @Matches(REG_NAME, { message: 'Name must contain only letters and spaces' })
  readonly name?: string;

  @IsInt({ message: 'Quantity must be a number' })
  readonly qty?: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be a number' })
  readonly price?: number;
}
