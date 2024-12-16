import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ImageData } from '@/types/ImageData';
import { IMG_URL } from '@/config/env';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { memo } from 'react';

type Props = {
    image: ImageData;
    style?: object;
};

const Picture = ({ image, style }: Props) => {
    const { colors } = useTheme();
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push(`/image/${image.id}`)}
            style={[styles.container, { borderColor: colors.border, borderWidth: 1 }, { ...style }]}
            activeOpacity={0.4}
        >
            <Image source={{ uri: `${IMG_URL}/${image.filename}` }} style={styles.image} />
        </TouchableOpacity>
    );
};

export default memo(Picture);

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        margin: 5,
        flex: 1,
        aspectRatio: 1,
        overflow: 'hidden',
        position: 'relative' // Needed for zIndex
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});
