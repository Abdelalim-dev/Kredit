/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Auth } from './src/screens'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as i18n from './src/i18n'

export const SessionContext = createContext()

// TODO: Load lang from localstorage
// ...
let lang = 'en'
i18n.init(lang)
global._ = i18next.t

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const session = {
    isLoggedIn,
    changeSession: (isLoggedIn) => setIsLoggedIn(isLoggedIn)
  }

  return (
    <NavigationContainer>
      <SessionContext.Provider value={session}>
        {isLoggedIn ?
          <Home /> :
          <Auth />
        }
      </SessionContext.Provider>
    </NavigationContainer>
  );
};

export default withTranslation()(App);