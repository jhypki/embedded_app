import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { API_URL } from '@/config/env';
import { useImages } from '@/contexts/ImageContext';
import ThemedText from '@/components/ui/ThemedText';
import { useTheme } from '@react-navigation/native';
import { GetLabelForImage } from '@/api/GetLabelForImage';
import Button from '@/components/ui/Button';
// import RNFS from 'react-native-fs';
import AntDesign from '@expo/vector-icons/AntDesign';

const ImageView = () => {
    const { id } = useLocalSearchParams();
    const { images, setImages } = useImages();
    const { colors } = useTheme();

    const [generatingLabel, setGeneratingLabel] = useState(false);
    const [localLabel, setLocalLabel] = useState<string | null>(null);
    const [downloading, setDownloading] = useState(false);

    const image = images?.find((image) => image.id === Number(id));

    // const downloadImage = async () => {
    //     if (!image) return;

    //     setDownloading(true);
    //     const downloadPath = `${RNFS.DownloadDirectoryPath}/${image.filename}`;

    //     try {
    //         await RNFS.downloadFile({
    //             fromUrl: `${API_URL}/uploads/${image.filename}`,
    //             toFile: downloadPath
    //         }).promise;

    //         console.log('File downloaded to:', downloadPath);
    //         alert(`Image downloaded to ${downloadPath}`);
    //     } catch (error) {
    //         console.error('Download error:', error);
    //         alert('Failed to download image.');
    //     } finally {
    //         setDownloading(false);
    //     }
    // };

    const generateLabel = async () => {
        if (!id) return;

        setGeneratingLabel(true);
        try {
            const label = await GetLabelForImage(id.toString());
            setLocalLabel(label);

            if (image) {
                image.label = label;
                setImages((prevImages) => prevImages!.map((img) => (img.id === Number(id) ? { ...img, label } : img)));
            }
        } catch (error) {
            console.error('Error generating label:', error);
        } finally {
            setGeneratingLabel(false);
        }
    };

    if (!image) {
        return (
            <View style={styles.centered}>
                <Text>Image not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Image source={{ uri: `${API_URL}/uploads/${image?.filename}` }} style={styles.image} />
            <View style={styles.container}>
                <ThemedText fontSize={20} style={styles.date}>
                    {new Date(image.uploadedAt).toLocaleString()}
                </ThemedText>

                {generatingLabel ? (
                    <ActivityIndicator style={styles.activityIndicator} size="large" color={colors.primary} />
                ) : (
                    <Button onPress={generateLabel}>Generate label</Button>
                )}

                <View style={styles.labelContainer}>
                    {image.label || localLabel ? (
                        <Text style={[{ color: colors.primary }, styles.label]}>{image.label || localLabel}</Text>
                    ) : null}
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.icons}>
                        <TouchableWithoutFeedback style={styles.circularButton}>
                            <AntDesign name="download" size={24} color={colors.primary} style={{ marginBottom: 20 }} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={styles.circularButton}>
                            <AntDesign name="sharealt" size={24} color={colors.primary} style={{ marginBottom: 20 }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ImageView;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
        aspectRatio: 1
    },
    container: {
        padding: 16,
        flex: 1,
        flexDirection: 'column'
    },
    date: {
        marginBottom: 10
    },
    activityIndicator: {
        marginVertical: 10
    },
    labelContainer: {
        marginTop: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    circularButton: {
        width: 100,
        height: 100,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
