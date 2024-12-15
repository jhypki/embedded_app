import apiClient from '@/config/axios';
import { ImageData } from '@/types/ImageData';
import axios from 'axios';

export const FetchImageById = async (id: number): Promise<ImageData> => {
    try {
        const response = await apiClient.get(`/esp/images/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            console.error('Config:', error.config);
        } else {
            console.error('Unexpected Error:', error);
        }
        return {} as ImageData;
    }
};
