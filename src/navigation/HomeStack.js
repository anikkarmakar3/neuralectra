import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';
import Controller from '../screens/home/Controller';
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();
const HomeStack = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      options={{gestureEnabled: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Controller" component={Controller} />
    </Stack.Navigator>
  );
};
export default HomeStack;
