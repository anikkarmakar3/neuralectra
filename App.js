import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import StackNav from './src/navigation/StackNav';
import {Provider} from 'react-redux';
import Store from './src/redux/Store';
import connectionrequest from './src/utils/helpers/NetInfo';

const App = () => {
  // SystemNavigationBar.leanBack();
  const signUp = 'signUp';
  const [online,setonline]=useState(true)

  return (
    <Provider store={Store}>
      <>
        <GestureHandlerRootView style={{flex: 1}}>
          <StackNav />
          {/* <TouchableOpacity onPress={()=>refresh()}><Text>Hello</Text></TouchableOpacity> */}
        </GestureHandlerRootView>
      </>
    </Provider>
  );
};

export default App;
