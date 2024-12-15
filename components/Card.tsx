import { StyleSheet, Text, View } from 'react-native';
import ThemedText from './ui/ThemedText';
import { useTheme } from '@react-navigation/native';

type Props = {
    children: React.ReactNode;
    title: string;
    padding?: number;
};

const Card = ({ children, title, padding = 16 }: Props) => {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    padding: padding,
                    borderColor: colors.border,
                    backgroundColor: colors.card
                }
            ]}
        >
            <ThemedText fontSize={16}>{title}</ThemedText>
            {children}
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        borderRadius: 16
    }
});
