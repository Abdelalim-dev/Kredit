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
import { SafeAreaView } from 'react-native';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <NavigationContainer>
      <SafeAreaView>
        {isLoggedIn ?
          <Home /> :
          <Auth />
        }
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
