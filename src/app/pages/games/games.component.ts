import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, CardListComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchGames();
    window.scrollTo(0, 0);
  }

  private fetchGames() {
    this.http.get<Game[]>('http://localhost:8001/games')
      .subscribe({
        next: (games) => {
          this.games = games;
        },
        error: (error) => {
          console.error('Error fetching games:', error);
        }
      });
  }

  get formattedGames() {
    return this.games.map(game => ({
      id: game.game_id.toString(),
      name: game.title,
      price: game.price,
      imageUrl: game.square_image_url,
      discountPercentage: game.discount_percentage
    }));
  }
}
