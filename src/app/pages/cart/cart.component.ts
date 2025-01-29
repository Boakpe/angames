import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCart();
    window.scrollTo(0, 0);
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

  async handleCheckout() {
    try {
      this.isLoading = true;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Create purchases for each game in cart
      const purchases = this.cartItems.map(item => ({
        user_id: user.user_id,
        game_id: parseInt(item.gameId),
        purchase_price: item.price
      }));

      // Send all purchase requests
      await Promise.all(
        purchases.map(purchase => 
          this.http.post('http://localhost:8001/purchases/', purchase).toPromise()
        )
      );

      // Clear cart after successful purchase
      this.cartItems = [];
      this.updateLocalStorage();
      alert('Purchase completed successfully!');
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('Failed to complete purchase. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }
}
