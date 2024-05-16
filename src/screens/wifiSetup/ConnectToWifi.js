import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import icons from '../../constants/icons';
import images from '../../constants/images';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import normalize from '../../utils/helpers/normalize';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
// import wifi from 'react-native-android-wifi'
import WifiManager from 'react-native-wifi-reborn';
import NetInfo from '@react-native-community/netinfo';
import WebView from 'react-native-webview';
import {connectioncheckReq, openDashboardReq} from '../../redux/reducers/DeviceControllerReducer';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader'
// const IOSWifiManager = NativeModules.IOSWifiManager;
import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window');

var interval;

const ConnectToWifi = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const DeviceControllerReducer = useSelector(
    state => state.DeviceControllerReducer,
  );

  navigation.addListener('beforeRemove', () => {
    interval && clearInterval(interval);
  });

  const [load, setLoad] = useState(false);
  // const netInfo = useNetInfo();

  const [availableList, setAvailableList] = useState(null);
  const checkAvailableWifis =async () => {
    console.log('access');



    if(Platform.OS=='ios'){


      WifiManager.getCurrentWifiSSID().then(
        ssid => {
          console.log("Your current connected wifi SSID is " + ssid);
        },
        () => {
          console.log("Cannot get current SSID!");
        }
      );
  
    }


    WifiManager.loadWifiList().then(e => {
      // WifiManager.loadWifiList().then(e => {
        console.log(e);
        setAvailableList(e);
      // });
    });
  };

  const recheckAvailableWifis = () => {
    console.log('access');
    if(Platform.OS=='ios'){



      
    }
else{
  WifiManager.reScanAndLoadWifiList().then(e => {
    console.log(e);
    setAvailableList(e);
});
}
  };

    useEffect(() => {
      const unSubscribe = navigation.addListener('focus', () => {
        interval = setInterval(() => {
          connectionrequest()
            .then(() => {
              // dispatch(openDashboardReq('test.config'));
            })
            .catch(err => {
              console.log('No internet', err);
            });
        }, 5000);
        return () => {
          interval && clearInterval(interval);
        };
      });

      return unSubscribe;
    }, []);

  useEffect(() => {
    if (
      DeviceControllerReducer.status === 'DeviceController/openDashboardSuccess'
    ) {
      if (DeviceControllerReducer.openDashboardStatus?.[0]?.value === 'OFF') {
        navigation.navigate('BottomTab');
        interval && clearInterval(interval);
      }
    }
  }, [DeviceControllerReducer.status]);

  function refresh(){
    setInterval(()=>{
    let ar=false
        connectionrequest()
        .then(() => {
         dispatch(connectioncheckReq(true))
        })
        .catch(err => {
          dispatch(connectioncheckReq(false))
          // showErrorAlert('Please connect To Internet');
        });
       console.log(ar,'online');
      },100)
    }

  const connectDevice = (ssid, index) => {
    // WifiManager.disconnect().then(() => {
    WifiManager.connectToProtectedSSID(ssid, '', true, true).then(
      async () => {
        await WifiManager.forceWifiUsageWithOptions(true, {noInternet: true});
        console.log('hello');
        setConnect(index);
        setLoad(!load);
        // refresh()
      },
      () => {
        console.log('Connection failed!');
      },
    );
    // });
  };

  useEffect(() => {
    granted();
   
   
  }, []);

  // const granted = async () => {
  //   await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     {
  //       title: 'Location permission is required for WiFi connections',
  //       message:
  //         'This app needs location permission as this is required  ' +
  //         'to scan for wifi networks.',
  //       buttonNegative: 'DENY',
  //       buttonPositive: 'ALLOW',
  //     },
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     // You can now use react-native-wifi-reborn
  //   } else {
  //     // Permission denied
  //   }
  // };
  const granted1 = async () => {
    if(Platform.OS=='ios'){

    }
    else{
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission is required for WiFi connections',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          recheckAvailableWifis();
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          Linking.openSettings();
          return false;
        }
      } catch (err) {
        Linking.openSettings();
        return false;
      }
    }
    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   {
    //     title: 'Location permission is required for WiFi connections',
    //     message:
    //       'This app needs location permission as this is required  ' +
    //       'to scan for wifi networks.',
    //     buttonNegative: 'DENY',
    //     buttonPositive: 'ALLOW',
    //   },
    // );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   console.log('granted');
    //   // You can now use react-native-wifi-reborn
    // } else {
    //   console.log('ignor');
    //   // Permission denied
    // }
  };

  const granted = async () => {
    if(Platform.OS=='ios'){
      Geolocation.setRNConfiguration({
        authorizationLevel: 'always',
      });
      const granted = Geolocation.requestAuthorization('whenInUse');
      console.log(await granted,'request');
      if((await granted)=='denied'){
        Linking.openSettings()
      }
      else{
        console.log('granted');
        checkAvailableWifis();
      }
    }
    else{
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission is required for WiFi connections',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          checkAvailableWifis();
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          Linking.openSettings();
          return false;
        }
      } catch (err) {
        Linking.openSettings();
        return false;
      }
    }
    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   {
    //     title: 'Location permission is required for WiFi connections',
    //     message:
    //       'This app needs location permission as this is required  ' +
    //       'to scan for wifi networks.',
    //     buttonNegative: 'DENY',
    //     buttonPositive: 'ALLOW',
    //   },
    // );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   console.log('granted');
    //   // You can now use react-native-wifi-reborn
    // } else {
    //   console.log('ignor');
    //   // Permission denied
    // }
  };

  const [connect, setConnect] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [response, setResponse] = useState(null);



  // flatlist render item
  const WifiConnections = item => (
    <View
      key={item.BSSID} // each item
      style={[
        styles.eachItem,
        {
          marginBottom:
            item.index + 1 !== availableList.length ? normalize(14) : 0,
        },
      ]}>
      <View // each item name
        style={styles.itemName}>
        <Text
          style={[
            styles.itemNameText,
            {
              color:
                connect === item.index ? colors.COLOR_BLUE : colors.COLOR_BLACK,
            },
          ]}>
          {item.SSID}
        </Text>
      </View>
      <TouchableOpacity // connect button
        onPress={() => connectDevice(item.SSID, item.index)}
        style={[
          styles.connectBtn,
          {backgroundColor: connect === item.index && colors.COLOR_PRIMARY},
        ]}>
        <Text
          style={[
            styles.connectText,
            {
              color:
                connect === item.index
                  ? colors.COLOR_WHITE
                  : colors.PLACEHOLDER_COLOR,
            },
          ]}>
          {connect === item.index ? 'Connected' : 'Connect'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  function handleResponse(data){
    const array = Object.values(data);
    console.log(data,'webresponse',array);
    console.log(array[0],'cangoback',data?.canGoBack);
    data?.canGoBack==true?'hiiiii':'byyyyyyy'
   data?.canGoBack==true?(navigation.navigate('BottomTab'),setConnect('')):null
   
  }

  return connect == '' ? (
    <KeyboardAvoidingView
      style={{height, width}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View // main container
        style={styles.mainContainer}>
        <View // logo container
          style={styles.logoContainer}>
          <TouchableOpacity // back icon container
            style={styles.backIconContainer}
            onPress={() => navigation.goBack()}>
            <Image // back icon
              source={icons.RIGHT_ARROW}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Image // logo image
            source={images.APP_LOGO} // app logo
            style={styles.logo}
          />
        </View>

        <View // middle container
          style={styles.middleContainer}>
            
       {Platform.OS!='ios' &&   <Text // info text
            style={styles.infoText}>
            Dicoverable Wi-fi Devices
          </Text>}
        </View>

        <View // lower container
          style={styles.lowerContainer}>
          <View // gray container
            style={styles.loawerMainContainer}>
        {Platform.OS !='ios' &&   <View // text container
              style={styles.textContainer}>
                
              <Text // scan device text
                style={styles.scanDeviceText}>
                Scanning your devices
              </Text>
              <TouchableOpacity // refresh button
                onPress={() => granted1()}
                style={styles.refreshBtn}>
                <Text // refresh text
                  style={styles.refreshText}>
                  Press To Refresh
                </Text>
                <Image // refresh icon
                  source={icons.REFRESH_ICON}
                  style={styles.refreshIcon}
                />
              </TouchableOpacity>
            </View>}
            {
              Platform.OS== 'ios' &&
              <Text style={{textAlign:'center',width:'90%',
            alignSelf:'center',fontSize:normalize(12),fontFamily:fonts.INTER_MEDIUM,lineHeight:normalize(18)}}>Please minimize the app and connect to Neuralectra Wifi. After connect go to your browser and type http://192.168.4.1 after open the site connect with your wifi then open the app</Text>
            }
            <View // divider
              style={styles.divider}></View>

            {availableList !== null && (
              <FlatList // each item in a flatlist
                style={{height: height * 0.2}}
                showsVerticalScrollIndicator={false}
                data={availableList}
                renderItem={({item, index}) => (
                  <WifiConnections {...{...item, index}} />
                )}
                keyExtractor={item => item.BSSID}
              />
            )}

            <View // continue button
              style={styles.continueBtnContainer}>
              {connect !== '' && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('BottomTab')}
                  style={styles.continueBtn}>
                  <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  ) : 
  // ((connect !='' && DeviceControllerReducer?.connectioncheckStatus !=true) ?
  //  ( <Loader visible={true}/>):
   
   (<WebView
    source={{
      uri: 'http://192.168.4.1',
    }}
    onNavigationStateChange={(data)=>(handleResponse(data))
    }
    style={{
      // flex: 1,
      height: 400,
    }}
  />)
  // );
};

export default ConnectToWifi;

const styles = StyleSheet.create({
  mainContainer: {
    height,
    width,
  },
  logoContainer: {
    marginTop: height * 0.08,
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: height * 0.11,
    width: '80%',
    alignSelf: 'center',
  },
  backIconContainer: {paddingHorizontal: normalize(15)},
  backIcon: {
    height: normalize(18),
    width: normalize(18),
    transform: [{rotate: '-180deg'}],
    justifyContent: 'flex-start',
  },
  middleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  infoIcon: {height: normalize(18), width: normalize(18)},
  infoText: {
    fontSize: normalize(12),
    lineHeight: 17,
    fontWeight: '500',
    color: colors.COLOR_BLACK,
    textAlign: 'center',
    marginLeft: normalize(3),
    fontFamily: fonts.INTER_SEMIBOLD,
  },
  lowerContainer: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(24),
  },
  loawerMainContainer: {
    flex: 1,
    width: '92%',
    backgroundColor: colors.CUSTOM_GRAY + 20,
    borderRadius: normalize(18),
    alignItems: 'center',
    paddingTop: normalize(30),
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanDeviceText: {
    fontSize: normalize(11),
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLACK,
    textAlign: 'center',
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(12),
  },
  refreshText: {
    fontSize: normalize(12),
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLUE,
    marginRight: normalize(5),
    textAlign: 'center',
  },
  refreshIcon: {
    resizeMode: 'contain',
    height: normalize(18),
    width: normalize(18),
  },
  divider: {
    borderBottomColor: colors.CUSTOM_GRAY + 10,
    borderBottomWidth: normalize(0.5),
    width: '90%',
    marginBottom: normalize(34),
  },
  eachItem: {
    backgroundColor: colors.CUSTOM_GRAY + 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: normalize(8),
    alignItems: 'center',
  },
  itemName: {width: '60%'},
  itemNameText: {
    paddingVertical: normalize(12),
    paddingLeft: normalize(12),
    flexWrap: 'wrap',
  },
  connectBtn: {
    borderColor: colors.COLOR_BLACK,
    borderTopRightRadius: normalize(8),
    borderBottomEndRadius: normalize(8),
    borderWidth: 1,
    paddingVertical: normalize(12),
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectText: {
    color: colors.PLACEHOLDER_COLOR,
    fontSize: normalize(11),
    fontWeight: '500',
    fontFamily: fonts.INTER_MEDIUM,
    textAlign: 'center',
    lineHeight: 15,
  },
  continueBtnContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: normalize(12),
  },
  continueBtn: {
    backgroundColor: colors.COLOR_PRIMARY,
    width: '58%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(30),
    height: height * 0.055,
    borderRadius: normalize(7),
  },
  continueText: {
    color: colors.COLOR_WHITE,
    fontWeight: '500',
    fontSize: normalize(12),
    lineHeight: 17,
    fontFamily: fonts.INTER_MEDIUM,
  },
});
