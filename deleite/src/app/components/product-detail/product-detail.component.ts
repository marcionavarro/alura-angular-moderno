import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { catchError, Observable, of } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { AppShellRenderDirective } from "../../diretivas/app-shell-render.directive";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppShellNoRenderDirective } from "../../diretivas/app-shell-no-render.directive";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    MatProgressSpinnerModule,
    AppShellRenderDirective,
    AppShellNoRenderDirective
],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  quantities: number[] = [1, 2, 3, 4, 5];
  product$!: Observable<Product | null>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const productId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0', 10);
    this.product$ = this.productService.getProductById(productId)
      .pipe(
        catchError(error => {
          console.log('Error fetching product', error)
          return of(null);
        })
      );
  }
}
