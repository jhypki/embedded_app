import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Card from '../Card';
import ThemedText from '../ui/ThemedText';
import { useTheme } from '@react-navigation/native';

type Props = {
    title: string;
    count: number;
};

const CountCard = ({ title, count }: Props) => {
    const { colors } = useTheme();

    return (
        <Card title={title} style={{ flex: 1 }}>
            <ThemedText style={{ color: colors.primary }}>
                <Text style={[styles.highlightedText]}>{count}</Text> times
            </ThemedText>
        </Card>
    );
};

export default CountCard;

const styles = StyleSheet.create({
    highlightedText: {
        fontWeight: 'bold',
        fontSize: 32
    }
});
