import { Component, OnInit } from '@angular/core';
import { StudentQueryService } from '../../services/student-query.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  invalidQueries: any[] = [];

  constructor(
    private studentQueryService: StudentQueryService,
    private router: Router,
    public authService: AuthService
  ) {
    // ✅ Redirect to login if the user is not authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      console.log("❌ Not authenticated. Redirecting to login...");
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    } else {
      console.log("✅ Authenticated. Loading admin panel...");
    }
  }
  

  loadInvalidQueries(): void {
    this.studentQueryService.getInvalidQueries().subscribe(
      (data) => {
        this.invalidQueries = data;
      },
      (error) => {
        console.error("Error fetching invalid queries:", error);
      }
    );
  }

  deleteQuery(id: number): void {
    if (confirm('Are you sure you want to delete this query?')) {
      this.studentQueryService.deleteQuery(id).subscribe(
        () => {
          this.invalidQueries = this.invalidQueries.filter(q => q.id !== id);
        },
        (error) => {
          console.error("Error deleting query:", error);
        }
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
