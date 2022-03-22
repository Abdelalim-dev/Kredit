/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Home, Auth } from './src/screens'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as i18n from './src/i18n'
import * as i18nPersistance from './src/i18n/persistance'
import theme from './src/theme'
import { SessionPersistence } from 'src/services/persistence'
import { Loader } from 'src/components'

export const SessionContext = createContext()

global._ = i18next.t

/**
 * Must be run outside the component
 * to avoid issues when loading the preferred language
 */
async function init() {

  let lang = await i18nPersistance.getLocale();
  i18n.init(lang);
}
init()

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    loadSession()
  }, [])

  const loadSession = async () => {
    const session = await SessionPersistence.get()
    setIsLoggedIn(session != null)
  }

  const sessionValue = {
    isLoggedIn,
    changeSession: (isLoggedIn) => setIsLoggedIn(isLoggedIn)
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <SessionContext.Provider value={sessionValue}>
          {isLoggedIn === null ?
            <Loader /> : isLoggedIn ?
              < Home /> :
              <Auth />
          }
        </SessionContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default withTranslation()(App);