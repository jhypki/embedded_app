import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { API_URL } from '@/config/env';
import { useImages } from '@/contexts/ImageContext';
import ThemedText from '@/components/ui/ThemedText';

const ImageView = () => {
    const { id } = useLocalSearchParams();
    const { images } = useImages();

    const image = images?.find((image) => image.id === Number(id));

    if (!image) {
        return (
            <View>
                <Text>Image not found</Text>
            </View>
        );
    }

    return (
        <View>
            <Image source={{ uri: `${API_URL}/uploads/${image?.filename}` }} style={styles.image} />
            <View style={styles.container}>
                <ThemedText fontSize={20}>{new Date(image.uploadedAt).toLocaleString()}</ThemedText>
            </View>
        </View>
    );
};

export default ImageView;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        resizeMode: 'cover',
        aspectRatio: 1
    },
    container: {
        padding: 16
    }
});

const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleString();
};
