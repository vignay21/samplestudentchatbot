import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Fix *ngIf and ngModel
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // ✅ Fix missing property

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log("🔍 Login attempt:", this.username, this.password);
  
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log("✅ Login successful:", response);
        
        // Store the token
        localStorage.setItem('token', response.token);
  
        // Force page reload to reflect login status
        this.router.navigate(['/admin']).then(() => {
          window.location.reload(); // ✅ Fix: Ensures UI updates properly
        });
      },
      error: (error) => {
        console.error("❌ Login failed:", error);
        this.errorMessage = 'Invalid credentials!';
      }
    });
  }
  
}
