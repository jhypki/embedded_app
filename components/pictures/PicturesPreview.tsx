import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { FetchImages } from '@/api/FetchImages';
import { ImageData } from '@/types/ImageData';
import Picture from './Picture';
import socket from '@/config/socket';
import { SocketEvents } from '@/constants/socketEvents';
import { useImages } from '@/contexts/ImageContext';

const PicturesPreview = () => {
    const { images, setImages } = useImages();

    useEffect(() => {
        const fetchImages = async () => {
            const images = await FetchImages(3);
            setImages(images);
        };
        fetchImages();

        socket.on('image-upload', (image) => {
            console.log('Image uploaded:', image);
            setImages((prevImages) => {
                if (prevImages && prevImages.length > 0) {
                    return [image, prevImages[0], prevImages[1]].slice(0, 3);
                } else {
                    return [image];
                }
            });
        });

        return () => {
            socket.off(SocketEvents.IMAGE_UPLOAD);
        };
    }, []);

    return (
        <View style={styles.container}>
            {images?.slice(0, 3).map((image) => (
                <Picture key={image.id} image={image} />
            ))}
        </View>
    );
};

export default PicturesPreview;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});
