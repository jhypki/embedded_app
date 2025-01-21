import { ImageData } from '@/types/ImageData';
import { IMAGES_URL } from '@/config/env';
import { FetchData } from './FetchData';

export const FetchImages = async (count = 0): Promise<ImageData[]> => {
    return await FetchData<ImageData[]>(`${IMAGES_URL}?count=${count}`);
};
