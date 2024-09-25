'use client';
import React, { useState, FormEvent } from 'react';
import useSWR from 'swr';
import { useAuth } from '../Context/authContext';
import { TextField, Button, Box } from '@mui/material';

interface Message {
    id: string;
    content: string;
    sender: string;
    timestamp: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ChatComponent: React.FC = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState<string>('');
    const { data: messages, error, mutate } = useSWR<Message[]>('#', fetcher, {
        refreshInterval: 1000,
    });

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

        mutate(async (prevMessages) => [...(prevMessages || []), optimisticMessage], false);

        setMessage('');

        try {
            const response = await fetch('#', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        <div className="chat-container">
            <div className="message-list">
                {messages.map((msg: Message) => (
                    <div key={msg.id} className={`message ${msg.sender === user?.id ? 'sent' : 'received'}`}>
                        <strong>{msg.sender === user?.id ? 'You' : msg.sender}: </strong>
                        {msg.content}
                        <small>{new Date(msg.timestamp).toLocaleString()}</small>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="message-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
        
        
    );
};
