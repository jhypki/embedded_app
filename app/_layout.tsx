import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { CustomDarkTheme } from '@/styles/CustomDarkTheme';
import { CustomLightTheme } from '@/styles/CustomLightTheme';
import { ImageProvider } from '@/contexts/ImageContext';
import { ActivationProvider } from '@/contexts/ActivationContext';

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const { colors } = useTheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
            <ImageProvider>
                <ActivationProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
