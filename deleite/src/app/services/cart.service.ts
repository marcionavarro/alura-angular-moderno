import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/cart_item';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartitemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartitemsSubject.asObservable();

  addToCart(product: Product) {
    const currentItems = this.getCurrentItems();
    const itemIndex = currentItems.findIndex(
      (item) => (item.product.id = product.id),
    );

    if (itemIndex >= 0) {
      currentItems[itemIndex].quantity++;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.cartitemsSubject.next(currentItems);
  }

  private getCurrentItems(): CartItem[] {
    return this.cartitemsSubject.getValue();
  }
}
