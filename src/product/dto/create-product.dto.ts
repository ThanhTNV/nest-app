const REG_EMAIL =
  /^[a-zA-Z\d\.\-\_]+(\+\d+)?@[a-zA-Z\d\.\-\_]{1,65}\.[a-zA-Z]{1,5}$/;
const REG_NAME =
  /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+((\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)+)?$/;

import { IsString, IsInt, IsNotEmpty } from 'class-validator';
export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  readonly name: string;

  @IsInt({ message: 'Quantity must be a number' })
  readonly qty?: number;

  @IsInt({ message: 'Price must be a number' })
  readonly price: number;
}
