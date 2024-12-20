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

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

export const ChatComponent: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !user) return;
    try{
      const token = Cookies.get('access_token');
      if(!token){
        router.push('/');
        throw new Error('No token Found');
      }
      const res = await fetch(`${API_LINK}/api/input/chat/`, {
        method: 'POST',
        headers: {
          credentials: 'include',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: message,
          sender: user.id,
          session_id : null,
        }),
      });
      if(res.ok){
        const data = await res.json();
        const session_id = data.session_id;
        router.push(`/Chat/${session_id}`);
      }else{
        throw new Error('Failed to send message');
      }
    }catch(err){
      console.error(err);
    }finally{
      setMessage('');
    }
  }

  return (
    <Container maxWidth="lg"
     sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
     >
      <Box component="form"
       onSubmit={sendMessage}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, marginTop: 'auto' }}
      >
        <TextField
          id="message-input"
          name="message"
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        />
        <IconButton aria-label="Send" type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
};