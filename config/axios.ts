import axios from 'axios';
import { API_URL, API_KEY } from './env';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    }
});

export default apiClient;
