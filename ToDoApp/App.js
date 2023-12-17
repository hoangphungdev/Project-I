import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './src/screens/TaskList';
import UpdateTask from './src/screens/UpdateTask';

import React from 'react';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="UpdateTask" component={UpdateTask} options={{ headerShown: false }} />
        <RootStack.Screen name="TaskList" component={TaskList} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}


