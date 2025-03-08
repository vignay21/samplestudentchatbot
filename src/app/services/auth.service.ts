import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://localhost:7289/api/auth/login"; // ✅ Backend API URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log("🔍 Sending login request to:", this.apiUrl, { username, password }); // ✅ Debugging
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== ''; // Ensure token exists and is not empty
  }
  
  

  logout() {
    localStorage.removeItem('isLoggedIn');
  }
}
