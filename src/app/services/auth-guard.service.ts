import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; // ✅ Allow access if authenticated
    } else {
      this.router.navigate(['/login']); // ❌ Redirect to login if not authenticated
      return false;
    }
  }
}
