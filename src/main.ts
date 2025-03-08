import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './app/components/admin/admin.component';
import { ChatbotComponent } from './app/components/chatbot/chatbot.component';
import { AdminLoginComponent } from './app/components/admin-login/admin-login.component';
import { authGuard } from './app/services/auth-guard.service';
import { importProvidersFrom } from '@angular/core';

// Define routes
const appRoutes: Routes = [
  { path: '', component: ChatbotComponent }, // Default Chatbot Page
  { path: 'login', component: AdminLoginComponent }, // Admin Login Page
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] }, // 🔒 Protected Admin Page
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(RouterModule.forRoot(appRoutes)),
    provideRouter(appRoutes)
  ]
}).catch(err => console.error(err));
