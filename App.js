/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ThemeProvider from './src/context/ThemeProvider';
import RootNavigator from './src/navigator/RootNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      {/*<Banner />*/}
    </ThemeProvider>
  );
};

export default App;
