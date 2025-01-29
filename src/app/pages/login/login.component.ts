import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loginError: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:8001/login/', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Login error:', error);
            this.loginError = 'Login failed. Please check your credentials.';
          },
        });
    }
  }
}
