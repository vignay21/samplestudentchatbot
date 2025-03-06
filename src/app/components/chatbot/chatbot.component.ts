import { Component, OnInit } from '@angular/core';
import { StudentQueryService } from '../../services/student-query.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';




interface ChatMessage {
  text: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  chatMessages: ChatMessage[] = [];
  userInput: string = '';

  constructor(private studentQueryService: StudentQueryService) {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (!this.userInput.trim()) return;
  
    // Add user message to chat
    this.chatMessages.push({ text: this.userInput, isUser: true });
  
    // Fetch bot response from the backend using the query service
    this.studentQueryService.getQueries(this.userInput).subscribe(
      queries => {
        const response = queries.length
          ? queries[0].answer || "I don't have an answer."
          : "Sorry, I don't understand.";
        this.chatMessages.push({ text: response, isUser: false });
      },
      error => {
        // Log the full error object to the console
        console.error('Error fetching response:', error);
  
        // Check if the error has a status code
        if (error.status) {
          console.error(`Error Status: ${error.status}`);
          console.error(`Error Message: ${error.message}`);
        }
  
        // Show user-friendly message in chat
        this.chatMessages.push({ text: "Oops, something went wrong. Please try again.", isUser: false });
      }
    );
  
    this.userInput = ''; // Clear input field
  }
}  