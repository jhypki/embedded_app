import { StyleSheet, Text, View, Image } from 'react-native';
import { ImageData } from '@/types/ImageData';
import { API_URL } from '@/config/env';
import { useTheme } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';

type Props = {
    image: ImageData;
};

const Picture = ({ image }: Props) => {
    const { colors } = useTheme();

    return (
        <Link href={`/image/${image.id}`} style={[styles.container, { borderColor: colors.border, borderWidth: 1 }]}>
            <Image source={{ uri: `${API_URL}/uploads/${image.filename}` }} style={styles.image} />
        </Link>
    );
};

export default Picture;

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        margin: 5,
        flex: 1,
        aspectRatio: 1,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});
