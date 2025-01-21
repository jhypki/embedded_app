import { IMAGES_URL } from '@/config/env';
import { ImageData } from '@/types/ImageData';
import { FetchData } from './FetchData';

export const FetchImageById = async (id: string): Promise<ImageData> => {
    return await FetchData<ImageData>(`${IMAGES_URL}/${id}`);
};
