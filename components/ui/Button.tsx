import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import ThemedText from './ThemedText';

type Props = {
    children: React.ReactNode;
    backgroundColor?: string;
    fontSize?: number;
    padding?: number;
};

const Button = ({ children, backgroundColor, fontSize = 16, padding = 16 }: Props) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor || colors.primary, padding: padding }]}>
            <ThemedText fontSize={fontSize} style={{ fontWeight: 'bold' }}>
                {children}
            </ThemedText>
        </View>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        borderRadius: 16,
        alignItems: 'center'
    }
});
