/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AboutScreen } from './src/screens/about';
import QuotesScreen from './src/screens/quotes';
import { Provider } from 'mobx-react';
import { store } from './src/stores';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
            labelStyle: {
              fontSize: 16
            }
          }}
          
        >
          <Tab.Screen name="About" component={AboutScreen} />
          <Tab.Screen name="Quotes" component={QuotesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


export default App;
