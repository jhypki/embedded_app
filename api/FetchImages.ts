import apiClient from '@/config/axios';
import axios from 'axios';
import { ImageData } from '@/types/ImageData';
import { IMAGES_URL } from '@/config/env';

export const FetchImages = async (count = 0): Promise<ImageData[]> => {
    try {
        const response = await apiClient.get(`${IMAGES_URL}?count=${count}`);
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
