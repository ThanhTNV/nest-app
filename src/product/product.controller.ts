import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request, Response } from 'express';
import { Product } from './entities/product.entity';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(
    @Body(new ParseArrayPipe({ items: CreateProductDto }))
    createProductDto: CreateProductDto[],
    @Res() res: Response,
  ) {
    if (createProductDto.length === 0) {
      return res.status(400).send('No products to create');
    } else {
      const newProducts: Promise<Product>[] = await createProductDto.map(
        async (product) => await this.productService.create(product),
      );
      if (newProducts.length > 0) {
        return res.redirect(`/product/all`);
      } else {
        return res.status(500).send('Error creating products');
      }
    }
  }

  @Get('all')
  async findAll(): Promise<Product[] | string> {
    const products = await this.productService.findAll();
    return products.length > 0 ? products : 'No products found';
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | string> {
    const product = await this.productService.findOne(+id);
    return product ? product : 'Product not found';
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | string> {
    const updatedProd = await this.productService.update(+id, updateProductDto);
    return updatedProd ? updatedProd : 'Product not found';
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product | string> {
    const removedProd = await this.productService.remove(+id);
    return removedProd ? removedProd : 'Product not found';
  }

  @Get()
  getAll(@Req() req: Request, @Res() res: Response): void {
    res.redirect('/product/all');
  }
}
