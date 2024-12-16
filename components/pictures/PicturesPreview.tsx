import { StyleSheet, Text, View } from 'react-native';
import { ImageData } from '@/types/ImageData';
import Picture from './Picture';
import { useImages } from '@/contexts/ImageContext';

const PicturesPreview = () => {
    const { images } = useImages();

    if (!images) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

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
