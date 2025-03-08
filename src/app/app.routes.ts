import { Routes } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { authGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', component: ChatbotComponent },  // Default Chatbot Page
  { path: 'login', component: AdminLoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] } // Admin Page
];
