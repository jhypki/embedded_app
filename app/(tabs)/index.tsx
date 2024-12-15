import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { TabCommonStyle } from '@/styles/TabCommonStyle';
import ThemedText from '@/components/ui/ThemedText';
import Card from '@/components/Card';
import PicturesPreview from '@/components/pictures/PicturesPreview';
import AlarmCard from '@/components/AlarmCard';

export default function HomeScreen() {
    return (
        <View style={TabCommonStyle.container}>
            <AlarmCard />
            <Link href="/gallery" asChild>
                <Pressable>
                    <Card title={'Pictures taken'}>
                        <PicturesPreview />
                    </Card>
                </Pressable>
            </Link>
        </View>
    );
}
