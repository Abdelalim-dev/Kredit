/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Auth } from './src/screens'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <NavigationContainer>
      {isLoggedIn ?
        <Home /> :
        <Auth />
      }
    </NavigationContainer>
  );
};

export default App;
