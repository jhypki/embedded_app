// contexts/ImageContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ImageData } from '@/types/ImageData';
import { FetchImages } from '@/api/FetchImages';
import SocketService from '@/services/socketService';
import { SocketEvents } from '@/constants/socketEvents';
import * as Notifications from 'expo-notifications';

type ImageContextType = {
    images: ImageData[] | null;
    setImages: React.Dispatch<React.SetStateAction<ImageData[] | null>>;
    fetchImages: () => Promise<void>;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [images, setImages] = useState<ImageData[] | null>(null);

    const fetchImages = async () => {
        const newImages = await FetchImages();
        setImages(newImages);
    };

    const sendPushNotification = async (image: ImageData) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'New Image Uploaded',
                body: `A new image has been uploaded: ${image.id}`
            },
            trigger: null // immediate
        });
    };

    const handleImageUpload = (image: ImageData) => {
        setImages((prevImages) => {
            if (prevImages) {
                return [image, ...prevImages];
            }
            return [image];
        });
        sendPushNotification(image);
    };

    useEffect(() => {
        // Fetch initial images
        fetchImages();

        // Subscribe to socket event
        SocketService.subscribe(SocketEvents.IMAGE_UPLOAD, handleImageUpload);

        // Cleanup on unmount
        return () => {
            SocketService.unsubscribe(SocketEvents.IMAGE_UPLOAD, handleImageUpload);
        };
    }, []);

    return <ImageContext.Provider value={{ images, setImages, fetchImages }}>{children}</ImageContext.Provider>;
};

export const useImages = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImages must be used within an ImageProvider');
    }
    return context;
};
