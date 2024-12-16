import apiClient from '@/config/axios';
import axios from 'axios';
import { ActivationCount } from '@/types/ActivationCount';
import { ACTIVATIONS_URL } from '@/config/env';

export const FetchActivationCount = async (): Promise<ActivationCount> => {
    try {
        const response = await apiClient.get(`${ACTIVATIONS_URL}/count`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            console.error('Config:', error.config);
        } else {
            console.error('Unexpected Error:', error);
        }
        return {} as ActivationCount;
    }
};
