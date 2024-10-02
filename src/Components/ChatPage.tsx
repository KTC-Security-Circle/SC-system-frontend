'use client';
import React, { useState, useEffect, FormEvent } from 'react';
import useSWR from 'swr';
import { useAuth } from '../Context/authContext';
import { TextField, Button, Box, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Message } from '@/types/message';

const fetcher = (url: string, token: string | null) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        return res.json();
    });
};

export const ChatComponent: React.FC = () => {
    const { token, user } = useAuth();
    const [message, setMessage] = useState<string>('');
    const [authToken, setAuthToken] = useState<string | null>(null);  // トークンを状態に持たせる

    // useEffectでトークンを取得して設定する
    useEffect(() => {
        if (token) {
            setAuthToken(token);
        }
    }, [token]);

    // トークンが存在する場合にのみSWRを実行
    const { data: messages = [], error, mutate } = useSWR<Message[]>(
        authToken ? ['http://localhost:7071/api/app/view/chat/', authToken] : null, 
        ([url, token]) => fetcher(url, token as string), 
        {
            refreshInterval: 1000,
        }
    );

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim() || !user || !authToken) return;

        const optimisticMessage: Message = {
            id: Date.now().toString(),
            content: message,
            sender: user.id,
            timestamp: new Date().toISOString(),
        };

        const originalMessages = messages ? [...messages] : [];

        mutate([...messages, optimisticMessage], false);

        setMessage('');

        try {
            const response = await fetch('http://localhost:7071/api/app/input/chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
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

    if (error) return <div>Failed to load messages</div>;
    if (!messages) return <div>Loading...</div>;

    return (
        <Box className="chat-container" display="flex" flexDirection="column" height="100vh">
        {/* メッセージリスト */}
        <Box className="message-list" flexGrow={1} overflow="auto" p={2}>
            {messages.map((msg) => (
                <Box key={msg.id} className={`message ${msg.sender === user?.id ? 'sent' : 'received'}`}>
                    <strong>{msg.sender === user?.id ? 'You' : msg.sender}: </strong>
                    {msg.content}
                    <small>{new Date(msg.timestamp).toLocaleString()}</small>
                </Box>
            ))}
        </Box>

        {/* フォームを画面下に固定 */}
        <Box
            component="form"
            onSubmit={sendMessage}
            className="message-form"
            display="flex"
            alignItems="center"
            p={2}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'white',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを送信する"
                InputProps={{
                    sx: {
                      '&::placeholder': {
                        fontSize: '18px', // プレースホルダーのフォントサイズ
                      },
                    },
                  }}
                fullWidth
                variant="outlined"
                className="message-input"
                sx={{ marginRight: 1 }}
            />
            <IconButton aria-label="Send"
                className="send-button"
                type="submit">
                <SendIcon />
            </IconButton>
        </Box>
    </Box>
    );
};