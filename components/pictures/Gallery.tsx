import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import Picture from './Picture';
import { useImages } from '@/contexts/ImageContext';

const Gallery = () => {
    const { images } = useImages();

    return (
        <FlatList
            numColumns={4}
            data={images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Picture style={styles.picture} image={item} />}
            contentContainerStyle={styles.container}
            columnWrapperStyle={styles.row}
            initialNumToRender={12}
            windowSize={5}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 0
    },
    row: {
        justifyContent: 'space-between'
    },
    picture: {
        margin: 2,
        borderWidth: 0,
        borderRadius: 2
    }
});

export default Gallery;
