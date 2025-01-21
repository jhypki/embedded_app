import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BarChart } from 'react-native-gifted-charts';

import Card from './Card';
import { useActivations } from '@/contexts/ActivationContext';
import { ActivationData } from '@/types/ActivationData';
import { getCountsForPeriod } from '@/lib/utils';

type ChartCardProps = {
    // Let the parent specify if the chart is for a day, week, or month
    range?: 'day' | 'week' | 'month';
};

const ChartCard: React.FC<ChartCardProps> = ({ range = 'week' }) => {
    const { colors } = useTheme();

    // Chart data state
    const [chartData, setChartData] = useState<{ label: string; value: number }[]>([]);

    // Activations from context
    const { activations } = useActivations();

    const screenWidth = Dimensions.get('window').width;

    // Recompute chart data whenever activations or the range prop changes
    useEffect(() => {
        if (!activations) return;

        // Use a helper function to build label/value arrays for the chosen range
        const { labels, counts } = getCountsForPeriod(activations, range);

        // Transform the labels & counts into the shape expected by BarChart
        const data = labels.map((label, i) => ({
            label,
            value: counts[i]
        }));

        setChartData(data);
    }, [activations, range]);

    return (
        <Card title="Activations">
            <View style={styles.chartWrapper}>
                <BarChart
                    data={chartData}
                    height={200}
                    showVerticalLines={false}
                    showLine={false}
                    color={colors.text}
                    frontColor={colors.primary}
                    xAxisColor={colors.text}
                    yAxisColor={colors.text}
                    yAxisTextStyle={{ color: colors.text }}
                    xAxisLabelTextStyle={{ color: colors.text }}
                    noOfSections={4}
                    barWidth={26}
                    initialSpacing={5}
                    spacing={20}
                />
            </View>
        </Card>
    );
};

export default ChartCard;

const styles = StyleSheet.create({
    chartWrapper: {
        width: '100%',
        maxWidth: Dimensions.get('window').width - 40,
        alignSelf: 'center',
        overflow: 'hidden'
    }
});
