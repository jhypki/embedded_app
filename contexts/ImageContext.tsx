import React, { createContext, useContext, useState } from 'react';
import { ImageData } from '@/types/ImageData';

type ImageContextType = {
    images: ImageData[] | null;
    setImages: React.Dispatch<React.SetStateAction<ImageData[] | null>>;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [images, setImages] = useState<ImageData[] | null>(null);

    return <ImageContext.Provider value={{ images, setImages }}>{children}</ImageContext.Provider>;
};

export const useImages = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImages must be used within an ImageProvider');
    }
    return context;
};
