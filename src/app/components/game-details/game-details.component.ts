import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_percentage: number;
  image_url: string;
  copies_sold: number;
  release_date: Date;
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
  imports: [CommonModule],
  templateUrl: './game-details.component.html'
})
export class GameDetailsComponent implements OnInit {
  gameId: string | null = null;
  game: Game = {
    id: '1',
    title: 'Elden Ring',
    description: `ELDEN RING, developed by FromSoftware Inc. and produced by BANDAI NAMCO Entertainment Inc., 
                 is a fantasy action-RPG and FromSoftware's largest game to date, set within a world full of mystery 
                 and peril. In the Lands Between, danger and discovery await around every corner in FromSoftware's 
                 largest game to date.`,
    price: 59.99,
    discount_percentage: 15,
    image_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
    copies_sold: 20000000,
    release_date: new Date('2022-02-25')
  };
  isInCart: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.checkIfInCart();
  }

  checkIfInCart(): boolean {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    this.isInCart = cartItems.some(item => item.gameId === this.game.id);
    return this.isInCart;
  }

  addToCart() {
    if (this.checkIfInCart()) return;

    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItem: CartItem = {
      gameId: this.game.id,
      title: this.game.title,
      price: this.game.price * (1 - this.game.discount_percentage / 100),
      quantity: 1,
      image_url: this.game.image_url
    };

    cartItems.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.isInCart = true;
  }
}