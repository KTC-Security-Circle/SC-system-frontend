'use client';
import React, { useState, useEffect, FormEvent } from 'react';
import useSWR from 'swr';
import { useAuth } from '../Context/authContext';
import {
  Box,
  Container,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

// サンプルメッセージ
const sampleMessages: Message[] = [
  { id: '1', content: 'こんにちは！', sender: 'user1', timestamp: '2024-03-15T09:00:00Z' },
  { id: '2', content: 'お元気ですか？', sender: 'ai', timestamp: '2024-03-15T09:01:00Z' },
  { id: '3', content: 'はい、元気です！', sender: 'user1', timestamp: '2024-03-15T09:02:00Z' },
];

const fetcher = (url: string) => {
  return fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include',  
  }).then((res) => {
      if (!res.ok) {
          throw new Error('Failed to fetch');
      }
      return res.json();
  });
};

export const ChatComponent: React.FC = () => {
  const {user } = useAuth();
  const [message, setMessage] = useState<string>('');

  // トークンが存在する場合にのみSWRを実行
  const { data: messages = [], error, mutate } = useSWR<Message[]>(
    'http://localhost:7071/api/app/view/chat/', 
    fetcher,
);

const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!message.trim() || !user) return;

  const optimisticMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: user.id,
      timestamp: new Date().toISOString(),
  };

  const originalMessages = messages ? [...messages] : [];

  // 楽観的更新
  mutate([...messages, optimisticMessage], false);

  setMessage('');

  try {
      const response = await fetch('http://localhost:7071/api/app/input/chat/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',  // クッキーを送信するように設定
          body: JSON.stringify({ content: message, sender: user.id }),
      });

      if (response.ok) {
          mutate();
      } else {
          mutate(originalMessages, false);
          console.error('Failed to send message');
      }
  } catch (error) {
      mutate(originalMessages, false);
      console.error('Failed to send message:', error);
  }
  };

  if (error) return <Typography color="error" sx={{mt:8}}>Failed to load messages</Typography>;

  // ログインしていない場合はサンプルメッセージを使用
  const displayedMessages = user ? messages : sampleMessages;

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mt:6, mb: 2 }}>
        <List>
          {displayedMessages.map((msg: Message) => (
            <ListItem
            key={msg.id}
            sx={{ justifyContent: msg.sender === (user?.id || 'user1') ? 'flex-end' : 'flex-start' }}
          >
            <Box sx={{ maxWidth: '75%', position: 'relative' }}>
              <Paper
                elevation={1}
                sx={{
                  p: 1.4,
                  m: 1,
                  backgroundColor: msg.sender === (user?.id || 'user1') ? '#e5e7eb' : '#e5e7eb', 
                  color: msg.sender === (user?.id || 'user1') ? '#000000' : '#000000',
                  textAlign: msg.sender === (user?.id || 'user1') ? 'center' : 'center',
                  position: 'relative',
                  borderRadius: '20px',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderWidth: '11px',
                    borderStyle: 'solid',
                    borderColor:
                      msg.sender === (user?.id || 'user1')
                        ? 'transparent transparent transparent #e5e7eb'
                        : 'transparent #e5e7eb transparent transparent',
                    right: msg.sender === (user?.id || 'user1') ? '-20px' : 'auto',
                    left: msg.sender !== (user?.id || 'user1') ? '-20px' : 'auto',
                  },
                }}
              >
                <ListItemText primary={msg.content} sx={{ wordWrap: 'break-word' }} />
              </Paper>
            </Box>
          </ListItem>
          ))}
        </List>
      </Box>
      <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex',alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <TextField
          id="message-input"
          name="message"
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          InputProps={{
            sx: {
                '&::placeholder': {
                  fontSize: '18px', // プレースホルダーのフォントサイズ
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1E3C5F', // 枠線の色
                  borderRadius: '30px', // 角を丸く
                  
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1E3C5F', // ホバー時の枠線の色
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgb(0, 123, 255)', // フォーカス時の枠線の色
                },
              },
            }}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          sx={{ 
            mx:'auto',
           }}
        />
        <IconButton aria-label="Send"
                size="large"
                className="send-button"
                type="submit"
                sx={{color: '#1E3C5F'}}>
                <SendIcon fontSize="inherit" />
            </IconButton>
      </Box>
    </Container>
  );
};