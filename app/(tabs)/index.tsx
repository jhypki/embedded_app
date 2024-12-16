import { Link } from 'expo-router';
import { View, Text, Pressable, ScrollView, RefreshControl } from 'react-native';
import { TabCommonStyle } from '@/styles/TabCommonStyle';
import Card from '@/components/Card';
import PicturesPreview from '@/components/pictures/PicturesPreview';
import AlarmCard from '@/components/AlarmCard';
import CountCards from '@/components/countCards/CountCards';
import ChartCard from '@/components/ChartCard';
import React, { useEffect, useState } from 'react';
import { useImages } from '@/contexts/ImageContext';
import { useActivations } from '@/contexts/ActivationContext';
import { FetchImages } from '@/api/FetchImages';
import { FetchActivationCount } from '@/api/FetchActivationCount';
import { SocketEvents } from '@/constants/socketEvents';
import SocketService from '@/services/socketService';
import { ImageData } from '@/types/ImageData';
import { FetchActivations } from '@/api/FetchActivations';

export default function HomeScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const { fetchImages } = useImages();
    const { fetchActivationCount, fetchActivations } = useActivations();

    const onRefresh = async () => {
        setRefreshing(true);

        await Promise.all([fetchImages(), fetchActivationCount(), fetchActivations()]);

        setRefreshing(false);
    };
    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={TabCommonStyle.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            keyboardShouldPersistTaps="handled"
        >
            <AlarmCard />
            <Link href="/gallery" asChild>
                <Pressable>
                    <Card animated={true} title={'Pictures taken'}>
                        <PicturesPreview />
                    </Card>
                </Pressable>
            </Link>
            <CountCards />
            <ChartCard />
        </ScrollView>
    );
}
