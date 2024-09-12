import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // Add additional fields here
  readonly name?: string;
  readonly qty?: number;
  readonly price?: number;
}
