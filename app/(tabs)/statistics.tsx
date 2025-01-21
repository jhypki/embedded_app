import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ChartCard from '@/components/ChartCard';

export default function Gallery() {
    const { colors } = useTheme();

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            contentContainerStyle={styles.contentContainer}
        >
            {/* WEEKLY CHART */}
            <View style={[styles.chartWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.chartTitle, { color: colors.text }]}>Weekly Activations</Text>
                <ChartCard range="week" />
            </View>

            {/* DAILY CHART */}
            <View style={[styles.chartWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.chartTitle, { color: colors.text }]}>Daily Activations</Text>
                <ChartCard range="day" />
            </View>

            {/* MONTHLY CHART */}
            <View style={[styles.chartWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.chartTitle, { color: colors.text }]}>Monthly Activations</Text>
                <ChartCard range="month" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16
    },
    chartWrapper: {
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        // Border for clarity
        borderWidth: 1,

        // Shadow for iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowColor: '#000',

        // Elevation for Android
        elevation: 2
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12
    }
});
