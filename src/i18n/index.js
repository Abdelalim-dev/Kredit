import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locals/en';
import ha from './locals/ha';
import ibo from './locals/ibo';
import yo from './locals/yo';

export const init = (lang = 'en') => {
    i18n.use(initReactI18next)
        .init({
            lng: lang,
            fallbackLng: 'en',
            debug: true,
            interpolation: {
                escapeValue: false,
            },
            resources: {
                en: {
                    translation: en,
                },
                ha: {
                    translation: ha,
                },
                ibo: {
                    translation: ibo,
                },
                yo: {
                    translation: yo,
                },
            },
        });
}