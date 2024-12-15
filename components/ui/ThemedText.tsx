import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

type Props = {
    children: React.ReactNode;
    fontSize?: number;
};

export default function ThemedText({ children, fontSize }: Props) {
    const { colors } = useTheme();

    return <Text style={{ color: colors.text, fontSize: fontSize }}>{children}</Text>;
}
