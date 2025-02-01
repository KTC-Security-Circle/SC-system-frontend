import axios from "axios";
import Cookies from 'js-cookie';

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

export const fetchSessionItems = async () => {
    const token = Cookies.get('access_token');
    if (!token) {
        throw new Error('No token found');
    }
    const res = await axios.get(`${API_LINK}/api/view/session`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            withCredentials: true, 
        },
    });
    return res.data;
};