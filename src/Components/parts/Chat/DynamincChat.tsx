'use client';

import React, { useState, useEffect, FormEvent,useRef } from 'react';
import Cookies from 'js-cookie';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

import {
  Box,
  Container,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';


interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

export const DynamicChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading,setLoading]=useState<boolean>(false);
  const router = useRouter();
  const { session_id } = useParams();
  const token = Cookies.get('access_token');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session_id || Array.isArray(session_id)) {
      router.push('/');
      return;
    }

    const fetchMessages = async () => {
      try {
        if (!token) {
          router.push('/');
          return;
        }

        const res = await fetch(`${API_LINK}/api/view/session/${session_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await res.json();
        const formattedMessages = data.flatMap((msg: any) => [
          {
            id: `${msg.id}-user`,
            content: msg.message,
            sender: 'user',
            timestamp: msg.pub_data,
          },
          {
            id: `${msg.id}-bot`,
            content: msg.bot_reply,
            sender: 'bot',
            timestamp: msg.pub_data,
          },
        ]);
        setMessages(formattedMessages);
      } catch (err) {
        setError('Failed to load messages');
      }
    };

    fetchMessages();
  }, [session_id, router, token]);

  useEffect(()=> {
    if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior: "smooth"});
    }
  },[messages])

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!token) {
      router.push('/');
      return;
    }

    if (!session_id || Array.isArray(session_id)) {
      return;
    }

    const optimisticMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user', // ユーザーIDを送信しない
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, optimisticMessage]);
    setLoading(true);

    try {
      const res = await fetch(`${API_LINK}/api/input/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          credentials: 'include',
        },
        body: JSON.stringify({
          message: message,
          pub_data: new Date().toISOString(),
          session_id: parseInt(session_id, 10), 
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      const data = await res.json();
      const botReply: Message = {
        id: Date.now().toString(),
        content: data.bot_reply,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setMessage('');
      setLoading(false);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#e6ffff' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
              <Toolbar />
        <List>
          {messages.map((msg: Message) => (
            <ListItem
              key={msg.id}
              sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
              >
              {msg.sender === 'bot' && (
                <Image src="/ai_icon.png" alt="AI" width={40} height={40}  />
              )}
              <Box sx={{ maxWidth: '75%', position: 'relative' }}>
                <Paper
                  elevation={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1.4,
                    m: 1,
                    backgroundColor: msg.sender === 'user' ? '#e5e7eb' : '#e5e7eb',
                    color: msg.sender === 'user' ? '#000000' : '#000000',
                    textAlign: msg.sender === 'user' ? 'center' : 'center',
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
                        msg.sender === 'user'
                          ? 'transparent transparent transparent #e5e7eb'
                          : 'transparent #e5e7eb transparent transparent',
                      right: msg.sender === 'user' ? '-20px' : 'auto',
                      left: msg.sender !== 'user' ? '-20px' : 'auto',
                    },
                  }}
                >
                  <ListItemText primary={msg.content} sx={{ wordWrap: 'break-word' }} />
                </Paper>
              </Box>
            </ListItem>
          ))}
          <div ref={bottomRef}/>
        </List>
      </Box>
      <Box component="form" onSubmit={sendMessage} sx={{ position:'flex', bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', mb:2 }}>
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
          multiline
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          sx={{ mx: 'auto' }}
        />
        <IconButton aria-label="Send" size="large" className="send-button" type="submit" sx={{ color: '#1E3C5F' }}>
          <SendIcon fontSize="inherit" />
        </IconButton>
        {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
      </Box>
    </Container>
  );
};