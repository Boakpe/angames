import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Game {
  game_id: number;
  title: string;
  description: string;
  price: number;
  discount_percentage: number;
  widescreen_image_url: string;
  square_image_url: string;
  copies_sold: number;
  release_date: string;
}

interface CartItem {
  gameId: string;
  title: string;
  price: number;
  quantity: number;
  image_url: string;
}

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './game-details.component.html'
})
export class GameDetailsComponent implements OnInit {
  gameId: string | null = null;
  game?: Game;
  isLoading = true;
  error: string | null = null;
  isInCart: boolean = false;
  isOwned: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.fetchGame(this.gameId);
    }
    window.scrollTo(0, 0);
    this.checkGameOwnership();
  }

  private fetchGame(id: string) {
    this.http.get<Game>(`http://localhost:8001/games/${id}`).subscribe({
      next: (data) => {
        this.game = data;
        this.isLoading = false;
        this.checkIfInCart();
      },
      error: (error) => {
        this.error = 'Failed to load game details';
        this.isLoading = false;
        console.error('Error fetching game:', error);
      }
    });
  }

  private checkGameOwnership() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.user_id && this.gameId) {
      this.http.get<{owns_game: boolean}>(`http://localhost:8001/purchases/verify/${user.user_id}/${this.gameId}`).subscribe({
        next: (response) => {
          this.isOwned = response.owns_game;
        },
        error: (error) => {
          console.error('Error checking game ownership:', error);
        }
      });
    }
  }

  checkIfInCart(): boolean {
    if (!this.game) return false;
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    this.isInCart = cartItems.some(item => item.gameId === this.game!.game_id.toString());
    return this.isInCart;
  }

  addToCart() {
    if (!this.game || this.checkIfInCart() || this.isOwned) return;

    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItem: CartItem = {
      gameId: this.game.game_id.toString(),
      title: this.game.title,
      price: this.game.price * (1 - this.game.discount_percentage / 100),
      quantity: 1,
      image_url: this.game.widescreen_image_url
    };

    cartItems.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.isInCart = true;
  }
}