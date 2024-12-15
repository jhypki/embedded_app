import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { API_URL } from '@/config/env';
import { useImages } from '@/contexts/ImageContext';

const ImageView = () => {
    const { id } = useLocalSearchParams();
    const { images } = useImages();

    const image = images?.find((image) => image.id === Number(id));

    return (
        <View>
            <Image source={{ uri: `${API_URL}/uploads/${image?.filename}` }} style={styles.image} />
        </View>
    );
};

export default ImageView;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        resizeMode: 'cover',
        aspectRatio: 1
    }
});
