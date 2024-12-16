import { FetchActivationCount } from '@/api/FetchActivationCount';
import { FetchActivations } from '@/api/FetchActivations';
import { ActivationCount } from '@/types/ActivationCount';
import { ActivationData } from '@/types/ActivationData';
import { createContext, useState, useContext, useEffect } from 'react';
import SocketService from '@/services/socketService';
import { SocketEvents } from '@/constants/socketEvents';

type ActivationContextType = {
    activations: ActivationData[] | null;
    setActivations: React.Dispatch<React.SetStateAction<ActivationData[] | null>>;
    activationCount: ActivationCount;
    setActivationCount: React.Dispatch<React.SetStateAction<ActivationCount>>;
    fetchActivations: () => Promise<void>;
    fetchActivationCount: () => Promise<void>;
};

const ActivationContext = createContext<ActivationContextType | undefined>(undefined);

export const ActivationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activations, setActivations] = useState<ActivationData[] | null>(null);
    const [activationCount, setActivationCount] = useState<ActivationCount>({
        count: {
            total: 0,
            daily: 0,
            weekly: 0
        }
    });

    const fetchActivationCount = async () => {
        const count = await FetchActivationCount();
        setActivationCount(count);
    };

    const fetchActivations = async () => {
        const activations = await FetchActivations();
        setActivations(activations);
    };

    const updateActivationCount = async () => {
        setActivationCount((prev) => {
            return {
                count: {
                    daily: prev.count.daily + 1,
                    weekly: prev.count.weekly + 1,
                    total: prev.count.total + 1
                }
            };
        });
    };

    useEffect(() => {
        fetchActivationCount();
        fetchActivations();

        SocketService.subscribe(SocketEvents.SENSOR_ACTIVATED, updateActivationCount);

        return () => {
            SocketService.unsubscribe(SocketEvents.SENSOR_ACTIVATED, updateActivationCount);
        };
    }, []);

    return (
        <ActivationContext.Provider
            value={{
                activations,
                setActivations,
                activationCount,
                setActivationCount,
                fetchActivations,
                fetchActivationCount
            }}
        >
            {children}
        </ActivationContext.Provider>
    );
};

export const useActivations = () => {
    const context = useContext(ActivationContext);
    if (!context) {
        throw new Error('useActivations must be used within an ActivationProvider');
    }
    return context;
};
