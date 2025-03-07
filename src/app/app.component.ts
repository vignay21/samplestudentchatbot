import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], 
  template: `
    <nav style="display: flex; gap: 20px; padding: 10px;">
      <a routerLink="/" class="home-link">Home</a>
      <a routerLink="/admin" class="admin-link">Go to Admin Panel</a>
    </nav>
    <router-outlet></router-outlet> <!-- Loads pages dynamically -->
  `,
  styles: [`
    nav {
      background-color: #f1f1f1;
      padding: 10px;
    }
    a {
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
    }
  `]
})
export class AppComponent {}
