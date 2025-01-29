import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  game = {
    title: '',
    price: 0,
    description: '',
    widescreen_image_url: '',
    square_image_url: '',
    release_date: '',
    discount_percentage: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  onSubmit() {
    this.http.post('http://localhost:8001/games/', this.game)
      .subscribe({
        next: (response) => {
          alert('Game added successfully!');
          // Reset form
          this.game = {
            title: '',
            price: 0,
            description: '',
            widescreen_image_url: '',
            square_image_url: '',
            release_date: '',
            discount_percentage: 0
          };
        },
        error: (error) => {
          alert('Error adding game: ' + error.message);
        }
      });
  }
}
