import { DefaultTheme } from 'react-native-paper';
import colors from './colors'

export default theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        accent: colors.accent,
    },
};

