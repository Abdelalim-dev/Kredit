import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_LOCALE = "locale"

export const getLocale = async () => {
    try {
        const locale = await AsyncStorage.getItem(APP_LOCALE)
        return locale || 'en'
    } catch (error) {
        console.error('KREDIT', error)
        return 'en'
    }
}

export const storeLocale = async (locale = 'en') => {
    try {
        await AsyncStorage.setItem(APP_LOCALE, locale)
    } catch (error) {
        console.error('KREDIT', error)
    }
}