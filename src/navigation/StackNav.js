import {View, Text} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';
// Splash screen
import Splash from '../screens/auth/Splash';
// Onboarding screen
import Onboarding from '../screens/auth/Onboarding';
// Login screen
import Login from '../screens/auth/Login';
// Sign Up screen
import SignUp from '../screens/auth/SignUp';
// Forgot Password screen
import ForgotPassword from '../screens/auth/ForgotPassword';
// your rooms screen
import YourRooms from '../screens/home/YourRooms';
import LivingRoom from '../screens/home/LivingRoom';
import Room from '../screens/home/Room';
import Controller from '../screens/home/Controller';
import ResetPassword from '../screens/auth/ResetPassword';
import ChooseAppliance from '../screens/chooseAppliance/ChooseAppliance';

import WifiStatusIdCheck from '../screens/wifiSetup/WifiStatusIdCheck';
import WifiStatusIdProvide from '../screens/wifiSetup/WifiStatusIdProvide';
import ConnectToWifi from '../screens/wifiSetup/ConnectToWifi';
import BottomTab from './BottomTab';
import Home from '../screens/home/Home';
import Dummy from '../screens/Dummy';
import ApplianceList from '../screens/chooseAppliance/ApplianceList';
import ConnectToWifiCopy from '../screens/wifiSetup/ConnectToWifiCopy';
import OTPVerification from '../screens/auth/OTPVerification';
import OtpVerified from '../screens/auth/OtpVeified';

const Stack = createNativeStackNavigator();
const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="ConnectToWifi"
        screenOptions={{
          headerShown: false,
        }}
        options={{gestureEnabled: false}}>
        <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="OTPVerification" component={OTPVerification} />
          <Stack.Screen name="OtpVerified" component={OtpVerified} />
        </>
        <>
          <Stack.Screen name="ChooseAppliance" component={ChooseAppliance} />
          <Stack.Screen name="ApplianceList" component={ApplianceList} />
          <Stack.Screen name="ConnectToWifi" component={ConnectToWifi} />
          <Stack.Screen
            name="WifiStatusIdCheck"
            component={WifiStatusIdCheck}
          />
          <Stack.Screen
            name="WifiStatusIdProvide"
            component={WifiStatusIdProvide}
          />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="YourRooms" component={YourRooms} />
          <Stack.Screen name="LivingRoom" component={LivingRoom} />
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="Dummy" component={Dummy} />
          <Stack.Screen
            name="ConnectToWifiCopy"
            component={ConnectToWifiCopy}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNav;
