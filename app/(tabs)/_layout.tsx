import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function TabLayout() {
    const { colors } = useTheme();
    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.card
                },
                headerTitleStyle: {
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: 'normal'
                },
                headerTintColor: 'white',
                tabBarStyle: [
                    Platform.select({
                        ios: {
                            position: 'fixed'
                        },
                        default: {}
                    })
                ],
                animation: 'shift'
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="gallery"
                options={{
                    title: 'Gallery',
                    tabBarIcon: ({ color }) => <AntDesign name="picture" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="statistics"
                options={{
                    title: 'Statistics',
                    tabBarIcon: ({ color }) => <AntDesign name="barschart" size={24} color={color} />
                }}
            />
        </Tabs>
    );
}
