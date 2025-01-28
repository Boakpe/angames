import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CarouselGame {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {
  currentSlide = 0;
  games: CarouselGame[] = [
    {
      id: '1',
      title: 'Cyberpunk 2077',
      description: 'Enter the immersive open-world of Night City',
      imageUrl: 'https://www.cyberpunk.net/build/images/pre-order/buy-b/keyart-ue-pt-br@2x-cd66fd0d.jpg',
      price: 299.90
    },
    {
      id: '2',
      title: 'Red Dead Redemption 2',
      description: 'Experience the epic tale of Arthur Morgan',
      imageUrl: 'https://img.hype.games/cdn/facad932-4082-4d20-980d-34bb385d2233Red-Dead-Redemption-2-Ultimate-Edition-Cover.jpg',
      price: 249.90
    },
    {
      id: '3',
      title: 'The Witcher 3',
      description: 'Embark on a monster-hunting adventure',
      imageUrl: 'https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S1_2560x1440-82eb5cf8f725e329d3194920c0c0b64f',
      price: 199.90
    }
  ];

  ngOnInit() {
    this.startCarousel();
  }

  private startCarousel() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.games.length;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 
      ? this.games.length - 1 
      : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
