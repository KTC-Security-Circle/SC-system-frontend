'use client';
import React, { useState, FormEvent } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { useRouter } from 'next/navigation';
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
import CircularProgress from '@mui/material/CircularProgress';
import { fetchSessionItems } from '@/hook/getSession';
import { useGetSession } from '@/Context/sessionContext';



const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

export const ChatComponent: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState<string>('');
  const [loading,setLoading]=useState<boolean>(false);
  const router = useRouter();
  const { setGetSession } = useGetSession();

  const sendMessage = async (e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!message.trim() || !user) return;
    setLoading(true);
    try {
      const token = Cookies.get('access_token');
      if (!token) {
        console.error('No token found');
        router.push('/');
        return;
      }
      const res = await fetch(`${API_LINK}/api/input/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          credentials: 'include',
        },
        body: JSON.stringify({
          message: message,
          pub_data: new Date().toISOString(),
          session_id: null,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const session_id = data.session_id;
        if (!session_id) {
          console.error('No session ID returned');
          router.push('/');
          return;
        }
        const updatedSessions = await fetchSessionItems();
        setGetSession(updatedSessions); 
        router.push(`/Chat/${session_id}`);
      } else {
        const errorData = await res.json();
        console.error('Failed to send message:', errorData);
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMessage('');
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
      <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#e6ffff' }}>
        <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, marginTop: 'auto',bottom: 0 }}>
          <TextField
            id="message-input"
            name="message"
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            multiline
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#d8d8d8',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
            }}
          />
          <IconButton aria-label="Send" type="submit" >
            <SendIcon />
          </IconButton>
          {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
        </Box>
      </Container>
  );
};