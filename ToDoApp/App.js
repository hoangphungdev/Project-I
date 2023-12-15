import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './src/screens/TaskList';

import React from 'react';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="TaskList" component={TaskList} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}


