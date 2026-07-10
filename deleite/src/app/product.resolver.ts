import { ResolveFn } from '@angular/router';
import { Product } from './interfaces/product';
import { inject } from '@angular/core';
import { ProductService } from './services/product.service';

export const productResolver: ResolveFn<Product> = (route, state) => {
  const productsService = inject(ProductService);
  const productId = parseInt(route.paramMap.get('id') ?? '0', 10);
  return productsService.getProductById(productId);
};
