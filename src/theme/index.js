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

const themeDanger = JSON.parse(JSON.stringify(theme))
themeDanger.colors.primary = theme.colors.accent
export const ThemeDanger = themeDanger

