import apiClient from '@/config/axios';
import axios from 'axios';
import { ActivationData } from '@/types/ActivationData';
import { ACTIVATIONS_URL } from '@/config/env';

export const FetchActivations = async (): Promise<ActivationData[]> => {
    try {
        const response = await apiClient.get(ACTIVATIONS_URL);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            console.error('Config:', error.config);
        } else {
            console.error('Unexpected Error:', error);
        }
        return [];
    }
};
