import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'game/:id',
    component: GameDetailsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];