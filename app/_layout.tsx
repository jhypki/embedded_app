// app/_layout.tsx
import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme, Alert } from 'react-native';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import { CustomDarkTheme } from '@/styles/CustomDarkTheme';
import { CustomLightTheme } from '@/styles/CustomLightTheme';

import { ImageProvider } from '@/contexts/ImageContext';
import { ActivationProvider } from '@/contexts/ActivationContext';

// Configure how notifications behave in foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});

export default function RootLayout() {
    const colorScheme = useColorScheme();

    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);

    return (
        <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
            <ImageProvider>
                <ActivationProvider>
                    <Stack>
                        {/* 
              This "name='(tabs)'" route will load app/(tabs)/index.tsx 
              or other files under app/(tabs)/ 
            */}
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                        {/* Example secondary screen */}
                        <Stack.Screen
                            name="image/[id]"
                            options={{
                                title: 'Image',
                                headerStyle: {
                                    backgroundColor:
                                        colorScheme === 'dark'
                                            ? CustomDarkTheme.colors.card
                                            : CustomLightTheme.colors.card
                                },
                                headerTintColor:
                                    colorScheme === 'dark' ? CustomDarkTheme.colors.text : CustomLightTheme.colors.text,
                                headerBackButtonDisplayMode: 'minimal'
                            }}
                        />
                    </Stack>
                </ActivationProvider>
            </ImageProvider>
        </ThemeProvider>
    );
}

async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // Ask for permissions if not already granted
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        // If still not granted, notify user
        if (finalStatus !== 'granted') {
            Alert.alert('Failed to get push token for push notification!');
            return;
        }

        // Optionally get the push token (for remote notifications)
        // const token = (await Notifications.getExpoPushTokenAsync()).data;
        // console.log('Expo Push Token:', token);
    } else {
        Alert.alert('Must use physical device for Push Notifications');
    }
}
