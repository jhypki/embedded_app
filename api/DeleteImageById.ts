import apiClient from '@/config/axios';
import axios from 'axios';

export const DeleteImageById = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`/images/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            console.error('Config:', error.config);
        } else {
            console.error('Unexpected Error:', error);
        }
    }
};
