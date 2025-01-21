import axios from 'axios';
import apiClient from '@/config/axios';

export const FetchData = async <T>(url: string): Promise<T> => {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            console.error('Config:', error.config);
        } else {
            console.error('Unexpected Error:', error);
        }
        return {} as T;
    }
};
