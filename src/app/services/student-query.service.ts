import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface StudentQuery {
  id?: number;
  question: string;
  answer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentQueryService {
  private apiUrl = 'https://localhost:7289/api/StudentQuery'; // Adjust the URL as per your backend

  constructor(private http: HttpClient) {}

  getQueries(searchText: string): Observable<any> {
    const params = new HttpParams().set('searchText', searchText);
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  postQuery(query: StudentQuery): Observable<StudentQuery> {
    return this.http.post<StudentQuery>(this.apiUrl, query);
  }

  deleteQuery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
