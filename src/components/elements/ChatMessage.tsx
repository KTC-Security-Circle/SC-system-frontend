import React from "react";
import { ChatMessage } from "@/types/ChatMessage";

interface ChatMessageProps {
    message: ChatMessage;
  }
  
export const ChatMessages: React.FC<ChatMessageProps> = ({ message }) => {
    return (
      <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-md p-4 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          {message.content}
        </div>
      </div>
    );
};
