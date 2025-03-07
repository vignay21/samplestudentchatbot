import { Routes } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: ChatbotComponent },  // Default Chatbot Page
  { path: 'admin', component: AdminComponent } // Admin Page
];
