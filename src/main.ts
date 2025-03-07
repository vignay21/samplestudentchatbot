import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router'; // ✅ Import Routes
import { AdminComponent } from './app/components/admin/admin.component'; // ✅ Import Admin Component
import { ChatbotComponent } from './app/components/chatbot/chatbot.component'; // ✅ Import Chatbot Component

// ✅ Define routes
const appRoutes: Routes = [
  { path: '', component: ChatbotComponent }, // Root route for Chatbot
  { path: 'admin', component: AdminComponent }, // Admin Panel Route
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes), // ✅ Use routes
  ]
}).catch(err => console.error(err));
