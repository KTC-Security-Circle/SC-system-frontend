'use client';
import React, { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useSWR from 'swr';
import {
  Box,
  Container,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
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

// fetcher 関数
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
  const { user } = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState<string>('');

  // SWR でメッセージを取得
  const { data: messages = [], error, mutate } = useSWR<Message[]>(
    user ? 'http://localhost:7071/api/app/view/chat/' : null, 
    fetcher
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
        credentials: 'include',
        body: JSON.stringify({ content: message, sender: user.id }),
      });

      if (response.ok) {
        mutate(); // サーバーの最新状態を取得
      } else {
        mutate(originalMessages, false); // エラー時に元の状態にロールバック
        console.error('Failed to send message');
      }
    } catch (error) {
      mutate(originalMessages, false); // エラー時に元の状態にロールバック
      console.error('Failed to send message:', error);
    }
  };

  // エラー表示
  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
        メッセージの取得に失敗しました。再読み込みしてください。
      </Typography>
    );
  }

  const displayedMessages = user ? messages : sampleMessages;

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <List>
          {displayedMessages.map((msg: Message) => (
            <ListItem
              key={msg.id}
              sx={{
                justifyContent: msg.sender === (user?.id || 'user1') ? 'flex-end' : 'flex-start',
              }}
            >
              <Box sx={{ maxWidth: '75%', position: 'relative' }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.4,
                    m: 1,
                    backgroundColor: msg.sender === (user?.id || 'user1') ? '#e5e7eb' : '#d1e7dd',
                    color: msg.sender === (user?.id || 'user1') ? '#000000' : '#004085',
                    textAlign: 'center',
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
                          : 'transparent #d1e7dd transparent transparent',
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
      <Box
        component="form"
        onSubmit={sendMessage}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
      >
        <TextField
          id="message-input"
          name="message"
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          InputProps={{
            sx: {
              '&::placeholder': {
                fontSize: '18px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1E3C5F',
                borderRadius: '30px',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1E3C5F',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(0, 123, 255)',
              },
            },
          }}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          sx={{
            mx: 'auto',
          }}
        />
        <IconButton
          aria-label="Send"
          size="large"
          className="send-button"
          type="submit"
          sx={{ color: '#1E3C5F' }}
        >
          <SendIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Container>
  );
};
