import { Component } from '@angular/core';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';

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
export class HomeComponent {
  promotions = Array(8).fill(null).map((_, i) => ({
    id: `${i}`,
    imageUrl: `https://picsum.photos/400/600?random=${i}`,
    name: `Promotion Product ${i + 1}`,
    price: 100 + i * 10,
    discountPercentage: 15 + i
  }));

  newReleases = Array(8).fill(null).map((_, i) => ({
    id: `${i}`,
    imageUrl: `https://picsum.photos/400/600?random=${i + 10}`,
    name: `New Release ${i + 1}`,
    price: 200 + i * 20,
    discountPercentage: 0
  }));

  popular = Array(8).fill(null).map((_, i) => ({
    id: `${i}`,
    imageUrl: `https://picsum.photos/400/600?random=${i + 20}`,
    name: `Popular Item ${i + 1}`,
    price: 150 + i * 15,
    discountPercentage: i % 2 === 0 ? 10 : 0
  }));
}