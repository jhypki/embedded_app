import { ActivationCount } from '@/types/ActivationCount';
import { ACTIVATIONS_URL } from '@/config/env';
import { FetchData } from './FetchData';

export const FetchActivationCount = async (): Promise<ActivationCount> => {
    return await FetchData<ActivationCount>(`${ACTIVATIONS_URL}/count`);
};
