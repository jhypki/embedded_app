import { StyleSheet, Dimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useTheme } from '@react-navigation/native';
import { ActivationData } from '@/types/ActivationData';
import { BarChart } from 'react-native-gifted-charts';
import { useActivations } from '@/contexts/ActivationContext';

const ChartCard = () => {
    const { colors } = useTheme();
    const [labels, setLabels] = useState<string[]>([]);
    const [counts, setCounts] = useState<number[]>([]);
    const [data, setData] = useState<{ label: string; value: number }[]>([]);

    const { activations } = useActivations();

    const screenWidth = Dimensions.get('window').width;

    const getCountsForLast7Days = (activations: ActivationData[]) => {
        const lastSevenDays = new Array(7).fill(0).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0].split('-').slice(1).join('-');
        });

        const counts = lastSevenDays.map((day) => {
            return activations.filter((activation: ActivationData) => {
                const activationDate = new Date(activation.activatedAt)
                    .toISOString()
                    .split('T')[0]
                    .split('-')
                    .slice(1)
                    .join('-');
                return activationDate === day;
            }).length;
        });

        return { labels: lastSevenDays.reverse(), counts: counts.reverse() };
    };

    useEffect(() => {
        if (!activations) return;
        const { labels, counts } = getCountsForLast7Days(activations);
        setLabels(labels);
        setCounts(counts);

        const data = labels.map((label, index) => {
            return {
                label: label,
                value: counts[index]
            };
        });

        setData(data);
    }, [activations]);

    return (
        <Card title={'Activations'}>
            <View style={styles.chartWrapper}>
                <BarChart
                    data={data}
                    width={screenWidth - 40}
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
                    disableScroll={true}
                    spacing={20}
                />
            </View>
        </Card>
    );
};

export default ChartCard;

const styles = StyleSheet.create({
    chartWrapper: {
        width: '100%', // Use the full width of the parent container
        maxWidth: Dimensions.get('window').width - 40, // Restrict max width
        alignSelf: 'center', // Center the chart
        overflow: 'hidden' // Ensure no overflow
    }
});
