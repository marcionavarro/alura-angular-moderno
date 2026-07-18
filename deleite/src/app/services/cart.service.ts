import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart_item';
import { Product } from '../interfaces/product';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartitemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartitemsSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.getCurrentItems();
    const itemIndex = this.findItemIndexByProductId(product.id);

    if (itemIndex >= 0) {
      currentItems[itemIndex].quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartitemsSubject.next(currentItems);
    this.saveCartItems(
      currentItems[itemIndex] || { product, quantity },
    ).subscribe();
  }

  updateCartItem(productId: number, quantity: number) {
    const currentItems = this.getCurrentItems();
    const itemIndex = this.findItemIndexByProductId(productId);

    if (itemIndex >= 0) {
      currentItems[itemIndex].quantity = quantity;
      this.cartitemsSubject.next(currentItems);
      this.saveCartItems(currentItems[itemIndex]).subscribe();
    }
  }

  removeFromCart(productId: number) {
    const updatedItems = this.getCurrentItems().filter(
      (item) => item.product.id !== productId,
    );
    this.cartitemsSubject.next(updatedItems);
    this.deleteCartItem(productId).subscribe();
  }

  getTotalQuantity(): number {
    return this.getCurrentItems().reduce((acc, item) => acc + item.quantity, 0);
  }

  private getCurrentItems(): CartItem[] {
    return this.cartitemsSubject.getValue();
  }

  private saveCartItems(cartItem: CartItem): Observable<void> {
    return from(
      supabase
        .from('cart_items')
        .upsert(
          {
            product_id: cartItem.product.id,
            quantity: cartItem.quantity,
          },
          { onConflict: 'product_id' },
        )
        .then(({ error }) => {
          if (error) throw new Error(error.message);
        }),
    );
  }

  private deleteCartItem(productId: number): Observable<void> {
    return from(
      supabase
        .from('cart_items')
        .delete()
        .eq('product_id', productId)
        .then(({ error }) => {
          if (error) throw new Error(error.message);
        }),
    );
  }

  private loadCart() {
    from(
      supabase
        .from('cart_items')
        .select('quantity, product:product_id (id, title, price, image)'),
    ).subscribe({
      next: ({ data, error }) => {
        if (error) {
          console.log('Erro ao carregar o carrinho', error.message);
        } else {
          const items = (data || []).map((item: any) => ({
            product: item.product,
            quantity: item.quantity,
          }));
          this.cartitemsSubject.next(items);
        }
      },
    });
  }

  private findItemIndexByProductId(productId: number) {
    const currentItems = this.getCurrentItems();
    return currentItems.findIndex((item) => item.product.id === productId);
  }
}
