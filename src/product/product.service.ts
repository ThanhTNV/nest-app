import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
// Database Logic here
@Injectable()
export class ProductService {
  private products = [];
  create(createProductDto: CreateProductDto): Product {
    console.log('Creating...');
    const newProduct: Product = {
      id: (this.products.length + 1).toString(),
      ...createProductDto,
    };
    this.products.push(newProduct);
    console.log('Created!', newProduct);

    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find((product) => product.id === id.toString());
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    if (!product) {
      return null;
    }
    const updatedProduct = { ...product, ...updateProductDto };
    this.products = this.products.map((product) =>
      product.id === id.toString() ? updatedProduct : product,
    );
    return updatedProduct;
  }

  remove(id: number): Product {
    const product: Product = this.findOne(id);
    if (!product) {
      return null;
    }
    this.products = this.products.filter(
      (product) => product.id !== id.toString(),
    );
    return product;
  }
}
