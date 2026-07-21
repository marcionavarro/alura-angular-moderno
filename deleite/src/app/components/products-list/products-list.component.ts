import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

import { Product } from '../../interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { finalize, Observable, tap } from 'rxjs';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppShellRenderDirective } from '../../diretivas/app-shell-render.directive';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, ProductCardComponent, MatProgressSpinnerModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  productsByCategory: { category: string; products: Product[] }[] = [];
  products$!: Observable<Product[]>;
  loading = signal(true);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getProducts();
    this.products$.subscribe((products) => {
      this.groupProductsByCategory(products);
      this.loading.set(false);
    });
  }

  groupProductsByCategory(products: Product[]) {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    this.productsByCategory = categories.map((category) => ({
      category,
      products: products.filter((product) => product.category === category),
    }));
  }
}
