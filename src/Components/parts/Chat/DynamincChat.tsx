'use client';

import React, { useState, useEffect, FormEvent, useRef } from 'react';
import Cookies from 'js-cookie';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useSession } from '@/Context/deleteSession';
import {
  Box,
  Container,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LinearLoading from '@/Components/parts/LinearLoading';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const router = useRouter();
  const { session_id } = useParams();
  const { deletedSessionId } = useSession();
  const token = Cookies.get('access_token');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handlemovehome = () => {
    router.push('/Chat');
  };

  useEffect(() => {
    if (deletedSessionId === Number(session_id)) {
      setIsDeleted(true);
    }
  }, [deletedSessionId, session_id]);

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
        if (err instanceof Error && err.message.includes('500')) {
          setIsDeleted(true);
          return;
        }
        setError('Failed to load messages');
      }
    };

    fetchMessages();
  }, [session_id, router, token]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!token) {
      router.push('/');
      return;
    }

    if (!session_id || Array.isArray(session_id)) return;

    const userMesage:Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    }
    
    const tempId = "temp_"+Date.now().toString();
    const thinkingMessage:Message ={
      id: tempId,
      content: 'thinking...',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    }


    setMessages((prevMessages) => [...prevMessages, userMesage, thinkingMessage]);
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
      setMessages((prevMessages) => prevMessages.map((msg) => msg.id === tempId ? botReply : msg));
    } catch (err) {
      setError('Failed to send message');
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

  if (error) return <div>{error}</div>;

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#e6ffff' }}>
      <Dialog open={isDeleted} onClose={handlemovehome} maxWidth="sm" fullWidth>
        <DialogTitle>セッション削除</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>このセッションは削除されました。</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlemovehome} variant="contained">
            ホームに戻る
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <Toolbar />
        <List>
          {messages.map((msg: Message) => (
            <ListItem key={msg.id} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.sender === 'bot' && <Image src="/ai_icon.png" alt="AI" width={40} height={40} />}
              <Paper sx={{ p: 1.4, m: 1, backgroundColor: '#d8d8d8', borderRadius: '20px' }}>
                <ListItemText primary={msg.content} />
              </Paper>
            </ListItem>
          ))}
          <div ref={bottomRef} />
        </List>
      </Box>
      <Box sx={{ width: '100%', height: '4px', visibility: loading ? 'visible' : 'hidden', justifyContent: 'center', mb: 1 }}>
        <LinearLoading />
      </Box>

      <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  mb: 2, marginTop: 'auto' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          multiline
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          sx={{ flexGrow: 1,
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
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
};
