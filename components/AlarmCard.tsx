import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Card from './Card';
import ThemedText from './ui/ThemedText';
import Button from './ui/Button';

const AlarmCard = () => {
    return (
        <Card style={{ alignItems: 'center' }}>
            <View style={styles.container}>
                <ThemedText fontSize={18}>Alarm is OFF</ThemedText>
                <Button fontSize={18}>Turn ON</Button>
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
