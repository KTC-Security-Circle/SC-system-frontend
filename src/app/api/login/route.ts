import { NextResponse } from 'next/server';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const response = await api.post('/demo/token', data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Login Failed', error);
        return NextResponse.json({ error: 'Login Failed' }, { status: 500 });
    }
}
