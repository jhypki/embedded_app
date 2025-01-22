import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Card from './Card';
import ThemedText from './ui/ThemedText';
import Button from './ui/Button';
import { getBuzzerStatus, toggleBuzzer } from '@/api/ToggleBuzzer';

const AlarmCard = () => {
    const [buzzerStatus, setBuzzerStatus] = React.useState<boolean>(false);

    React.useEffect(() => {
        getBuzzerStatus().then(setBuzzerStatus);
    }, []);

    const handleToggle = async () => {
        await toggleBuzzer(buzzerStatus);
        setBuzzerStatus(!buzzerStatus);
    };

    return (
        <Card style={{ alignItems: 'center' }}>
            <View style={styles.container}>
                <ThemedText fontSize={18}>Alarm is {buzzerStatus ? 'ON' : 'OFF'}</ThemedText>
                <Button onPress={handleToggle} fontSize={18}>
                    Turn {buzzerStatus ? 'OFF' : 'ON'}
                </Button>
            </View>
        </Card>
    );
};

export default AlarmCard;

const styles = StyleSheet.create({
    container: {
        width: '55%',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        paddingTop: 8,
        paddingBottom: 8
    }
});
