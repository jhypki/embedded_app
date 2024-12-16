import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import ThemedText from './ThemedText';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
    children: React.ReactNode;
    backgroundColor?: string;
    fontSize?: number;
    padding?: number;
};

const Button = ({ children, backgroundColor, fontSize = 16, padding = 16 }: Props) => {
    const { colors } = useTheme();
    const opacity = useSharedValue(1);

    const handlePress = () => {
        opacity.value = withSpring(0.5);
    };

    const handleRelease = () => {
        opacity.value = withSpring(1);
    };

    return (
        <Animated.View
            onTouchStart={handlePress}
            onTouchEnd={handleRelease}
            style={[
                styles.container,
                { backgroundColor: backgroundColor || colors.primary, padding: padding, opacity: opacity }
            ]}
        >
            <ThemedText fontSize={fontSize} style={{ fontWeight: 'bold', color: '#fff' }}>
                {children}
            </ThemedText>
        </Animated.View>
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
