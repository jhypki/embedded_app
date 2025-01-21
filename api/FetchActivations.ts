import { ActivationData } from '@/types/ActivationData';
import { ACTIVATIONS_URL } from '@/config/env';
import { FetchData } from './FetchData';

export const FetchActivations = async (count = 0): Promise<ActivationData[]> => {
    return await FetchData<ActivationData[]>(`${ACTIVATIONS_URL}?count=${count}`);
};
