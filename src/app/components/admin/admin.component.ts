import { Component, OnInit } from '@angular/core';
import { StudentQueryService } from '../../services/student-query.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  invalidQueries: any[] = [];

  constructor(private studentQueryService: StudentQueryService) {}

  ngOnInit(): void {
    this.loadInvalidQueries();
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
}
