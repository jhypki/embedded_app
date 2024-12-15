import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

type Props = {
    children: React.ReactNode;
    fontSize?: number;
    style?: object;
};

export default function ThemedText({ children, fontSize, style }: Props) {
    const { colors } = useTheme();

    return <Text style={{ color: colors.text, fontSize: fontSize, ...style }}>{children}</Text>;
}
