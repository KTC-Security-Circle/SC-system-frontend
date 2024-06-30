import { NextResponse } from 'next/server';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export async function GET() {
    try {
        const response = await api.get('/demo/users/me');
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Get User Failed', error);
        return NextResponse.json({ error: 'Get User Failed' }, { status: 500 });
    }
}
