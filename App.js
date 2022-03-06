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

export const SessionContext = createContext()

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

export default App;
