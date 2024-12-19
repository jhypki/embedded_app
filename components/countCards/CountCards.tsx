import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import CountCard from './CountCard';
import { ActivationCount } from '@/types/ActivationCount';
import { useActivations } from '@/contexts/ActivationContext';

const CountCards = () => {
    const { activationCount } = useActivations();

    return (
        <View style={styles.container}>
            <CountCard title={'Activated today'} count={activationCount?.count?.daily} />
            <CountCard title={'Activated this week'} count={activationCount?.count?.weekly} />
        </View>
    );
};

export default CountCards;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    }
});
