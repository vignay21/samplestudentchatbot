import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // ✅ Add RouterModule to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showAdminButton = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showAdminButton = this.router.url === '/';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
