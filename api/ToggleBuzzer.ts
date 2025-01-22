import axios from 'axios';
import apiClient from '@/config/axios';

export const getBuzzerStatus = async (): Promise<boolean> => {
    try {
        const response = await apiClient.get('/buzzer-state');
        return response.data.state;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            console.error('Config:', error.config);
        } else {
            console.error('Unexpected Error:', error);
        }
        return false;
    }
};

export const toggleBuzzer = async (currentState: boolean): Promise<void> => {
    try {
        await apiClient.post('/buzzer-state', { state: !currentState });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            console.error('Config:', error.config);
        } else {
            console.error('Unexpected Error:', error);
        }
    }
};
