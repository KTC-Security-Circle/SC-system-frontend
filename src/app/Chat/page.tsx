import React from 'react';
import { Chatwindow } from '@/Components/ChatPage';
const ChatPage: React.FC = () => {
  return (
    <Chatwindow window={{
      innerWidth: 0,
      innerHeight: 0
    }} />
  );
};
export default ChatPage;
