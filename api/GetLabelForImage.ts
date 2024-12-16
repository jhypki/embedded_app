import axios from 'axios';
import apiClient from '@/config/axios';
import { IMAGES_URL } from '@/config/env';

export const GetLabelForImage = async (imageId: string): Promise<string> => {
    try {
        const response = await apiClient.get(`${IMAGES_URL}/${imageId}/label`);
        return response.data?.label;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            console.error('Config:', error.config);
        } else {
            console.error('Unexpected Error:', error);
        }
        return '';
    }
};
