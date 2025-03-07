import { Component, OnInit } from '@angular/core';
import { StudentQueryService } from '../../services/student-query.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id?: number;  // Optional id field for identifying bot responses
  text: string;
  isUser: boolean;  // Determines if the message is from the user or bot
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  chatMessages: ChatMessage[] = [];  // Stores all messages in the chat
  userInput: string = '';  // Bind user input to this property

  constructor(private studentQueryService: StudentQueryService) {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (!this.userInput.trim()) return;  // Prevent sending empty messages

    const userMessage: ChatMessage = { text: this.userInput, isUser: true };  // Create message for user
    this.chatMessages.push(userMessage);  // Add user's message to chat

    // Call the service to fetch the bot's response
    this.studentQueryService.getQueries(this.userInput).subscribe(
      queries => {
        if (queries.length) {
          const query = queries[0];  // Assuming the first query is the most relevant
          const botResponse: ChatMessage = { 
            id: query.id,  // Attach the query ID for reporting invalid
            text: query.answer || "I don't have an answer.", 
            isUser: false  // Indicates this message is from the bot
          };
          this.chatMessages.push(botResponse);  // Add bot's response to chat
        } else {
          const botResponse: ChatMessage = { 
            text: "Sorry, I don't understand.", 
            isUser: false 
          };
          this.chatMessages.push(botResponse);  // Bot response for unrecognized queries
        }
      },
      error => {
        console.error('Error fetching response:', error);
        this.chatMessages.push({ 
          text: "Oops, something went wrong. Please try again.", 
          isUser: false 
        });
      }
    );

    this.userInput = '';  // Clear the user input field after sending
  }

  reportInvalid(queryId?: number): void {
    if (!queryId) {
      console.error("Query ID is missing!");
      alert("Failed to report. Query ID is missing.");
      return;
    }

    // Find the query object
    const query = this.chatMessages.find(msg => msg.id === queryId);
    if (!query) {
      console.error("Query not found!");
      alert("Failed to report. Query not found.");
      return;
    }

    // Call the service to report invalid queries
    this.studentQueryService.reportInvalidQuery({
      id: queryId,
      question: query.text,  // Send the question text
      answer: query.isUser ? '' : query.text  // Send answer if it's a bot message
    }).subscribe(
      () => {
        alert("Reported as invalid");
      },
      (error) => {
        console.error("Error reporting invalid query:", error);
        alert("Failed to report, Please try again.");
      }
    );
  }
}
