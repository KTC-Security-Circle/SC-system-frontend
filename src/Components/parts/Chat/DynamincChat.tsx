import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Cookies from 'js-cookie';
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

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
      credentials: 'include',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    return res.json();
  });

export const DynamicChat: React.FC = () => {
  const router = useRouter();
  const { session_id } = router.query; // URLのセッションIDを取得
  const [message, setMessage] = useState<string>('');
  const { data: messages = [], error, mutate } = useSWR<Message[]>(
    session_id ? `${API_LINK}/api/input/chat/` : null,
    fetcher
  );

  useEffect(() => {
    if (!session_id) {
      router.push('/'); // セッションIDがない場合はホームページにリダイレクト
    }
  }, [session_id, router]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    const token = Cookies.get('access_token');
    if (!token) {
      router.push('/');
      throw new Error('No token found');
    }

    const optimisticMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user', 
      timestamp: new Date().toISOString(),
    };

    // 楽観的更新
    mutate([...messages, optimisticMessage], false);

    try {
      const res = await fetch(`${API_LINK}/api/input/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          credentials: 'include',
        },
        body: JSON.stringify({ content: message }),
      });

      if (res.ok) {
        mutate(); 
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMessage(''); 
    }
  };

  if (error) return <Typography color="error">Failed to load messages</Typography>;

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <List>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Box sx={{ maxWidth: '75%' }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.4,
                    m: 1,
                    backgroundColor: msg.sender === 'user' ? '#e5e7eb' : '#f0f0f0',
                    borderRadius: '20px',
                  }}
                >
                  <ListItemText
                    primary={msg.content}
                    secondary={new Date(msg.timestamp).toLocaleString()}
                  />
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton aria-label="Send" type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

