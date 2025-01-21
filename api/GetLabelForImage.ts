import { IMAGES_URL } from '@/config/env';
import { FetchData } from './FetchData';
import { LabelResponse } from '@/types/LabelResponse';

export const GetLabelForImage = async (id: string): Promise<string> => {
    const response = await FetchData<LabelResponse>(`${IMAGES_URL}/${id}/label`);
    return response?.label;
};
