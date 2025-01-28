import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CartItem {
  gameId: string;
  title: string;
  price: number;
  quantity: number;
  image_url: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.gameId !== item.gameId);
    this.updateLocalStorage();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  private updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
