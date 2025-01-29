import { Component, OnInit } from '@angular/core';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardListComponent, CarouselComponent],
  template: `
    <div class="container mx-auto px-6 p-8">
      <app-carousel></app-carousel>
      <div class="mt-8">
        <div class="scroll-mt-20" id="promotions">
          <app-card-list
            title="PROMOÇÕES"
            [products]="promotions"
          ></app-card-list>
        </div>

        <div class="scroll-mt-20" id="new">
          <app-card-list
            title="LANÇAMENTOS"
            [products]="newReleases"
          ></app-card-list>
        </div>

        <div class="scroll-mt-20" id="popular">
          <app-card-list
            title="POPULARES"
            [products]="popular"
          ></app-card-list>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  promotions: any[] = [];
  newReleases: any[] = [];
  popular: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPromotions();
    this.fetchNewReleases();
    this.fetchPopular();
    window.scrollTo(0, 0);
  }

  private formatGames(games: Game[]) {
    return games.map(game => ({
      id: game.game_id.toString(),
      name: game.title,
      price: game.price,
      imageUrl: game.square_image_url,
      discountPercentage: game.discount_percentage
    }));
  }

  private fetchPromotions() {
    this.http.get<Game[]>('http://localhost:8001/games?order=biggest_discount&limit=8')
      .subscribe(games => this.promotions = this.formatGames(games));
  }

  private fetchNewReleases() {
    this.http.get<Game[]>('http://localhost:8001/games?order=newest&limit=8')
      .subscribe(games => this.newReleases = this.formatGames(games));
  }

  private fetchPopular() {
    this.http.get<Game[]>('http://localhost:8001/games?order=most_sold&limit=8')
      .subscribe(games => this.popular = this.formatGames(games));
  }
}