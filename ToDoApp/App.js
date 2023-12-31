import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './src/screens/TaskList';
import UpdateTask from './src/screens/UpdateTask';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import HomeScreen from './src/screens/HomeScreen';
import { UIProvider } from './UIContext.js';
import Pomodoro from './src/screens/Pomodoro';
import ImportantList from './src/screens/ImportantList';
import CompletedList from './src/screens/CompletedList';
import MyDayList from './src/screens/MyDayList';
import ScheduleList from './src/screens/ScheduleList';

import React from 'react';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <UIProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <RootStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <RootStack.Screen name="TaskList" component={TaskList} options={{ headerShown: false }} />
          <RootStack.Screen name="ImportantList" component={ImportantList} options={{ headerShown: false }} />
          <RootStack.Screen name="CompletedList" component={CompletedList} options={{ headerShown: false }} />
          <RootStack.Screen name="MyDayList" component={MyDayList} options={{ headerShown: false }} />
          <RootStack.Screen name="ScheduleList" component={ScheduleList} options={{ headerShown: false }} />
          <RootStack.Screen name="UpdateTask" component={UpdateTask} options={{ headerShown: false }} />
          <RootStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="Pomodoro" component={Pomodoro} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </UIProvider>
  );
}


