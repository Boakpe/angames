import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, CardListComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  userData: any;
  ownedGames: Game[] = [];

  constructor(private http: HttpClient) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.userData = JSON.parse(userStr);
    }
  }

  ngOnInit() {
    if (this.userData?.user_id) {
      this.fetchOwnedGames();
    }
    window.scrollTo(0, 0);
  }

  private fetchOwnedGames() {
    this.http.get<Game[]>(`http://localhost:8001/users/${this.userData.user_id}/games`)
      .subscribe({
        next: (games) => {
          this.ownedGames = games;
        },
        error: (error) => {
          console.error('Error fetching owned games:', error);
        }
      });
  }

  get formattedGames() {
    return this.ownedGames.map(game => ({
      id: game.game_id.toString(),
      name: game.title,
      price: game.price,
      imageUrl: game.square_image_url,
      discountPercentage: game.discount_percentage
    }));
  }
}
