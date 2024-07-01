import { NextResponse } from 'next/server';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export async function GET() {
    try {
        const response = await api.get('/api/messages');
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Get Messages Failed', error);
        return NextResponse.json({ error: 'Get Messages Failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { text } = await request.json();
        const response = await api.post('/api/messages', { text });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Post Message Failed', error);
        return NextResponse.json({ error: 'Post Message Failed' }, { status: 500 });
    }
}
