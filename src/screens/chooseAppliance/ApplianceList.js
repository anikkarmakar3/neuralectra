import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import images from '../../constants/images';
import normalize from '../../utils/helpers/normalize';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const ApplianceList = ({route}) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  const [bounceLng, setBounceLng] = useState(0);

  console.log('BOUNCE', bounceLng);
  const [expanded, setExpanded] = useState(null);

  const deviceData = route.params.item;

  const lowVoltageDevice = [
    {
      deviceName: 'Light',
      icon: icons.BULB_ICON,
      appliance_controller_id: '',
      appliance_status_id: '',
    },
    {
      deviceName: 'Fan',
      icon: icons.FAN,
      appliance_controller_id: '',
      appliance_status_id: '',
    },
    {
      deviceName: 'Plug',
      icon: icons.PLUG_ICON,
      appliance_controller_id: '',
      appliance_status_id: '',
    },
  ];

  // high voltage device list
  const highVoltageDevice = [
    {
      // MCB

      deviceName: 'MCB',
      icon: icons.MCB_ICON,
      appliance_controller_id: '',
      appliance_status_id: '',
    },
    {
      // Fridge

      deviceName: 'Fridge',
      icon: icons.FRIDGE_ICON,
      appliance_controller_id: '',
      appliance_status_id: '',
    },
    {
      // AC
      deviceName: 'Air Conditioner',
      icon: icons.AC_ICON,
      appliance_controller_id: '',
      appliance_status_id: '',
    },
    {
      // Geyser
      deviceName: 'Geyser',
      icon: icons.GEYSER_ICON,
      appliance_controller_id: '',
      appliance_status_id: '',
    },
    {
      // Television

      deviceName: 'Television',
      icon: icons.TV_ICON,
      appliance_controller_id: '',
      appliance_status_id: '',
    },
    {
      // Plug

      deviceName: 'Plug',
      icon: icons.PLUG_ICON,
      appliance_controller_id: '',
      appliance_status_id: '',
    },
  ];

  // screen count while selecting device
  const numbersToWords = {
    // 0: 'First',
    1: 'First',
    2: 'Second',
    3: 'Third',
    4: 'Fourth',
  };
  const numberToString = () => {
    // Initialize the words variable to an empty string
    let words = '';
    // If the ones place is not zero, add the word form of the ones place
    words = numbersToWords[selected.length];

    return words;
  };

  const ApplianceList = ({item, index}) => (
    <>
      <TouchableOpacity // flatlist render item
        onPress={() => {
          deviceData?.devCount > 1
            ? setExpanded(expanded === index ? null : index)
            : setSelected(
                selected?.some(e => e.index === item.index)
                  ? selected.filter(e => e.index !== item.index)
                  : [...selected, {...item, pIndex: index, cIndex: null}],
              );

          setBounceLng(
            // set bounce length
            selected?.some(e => e.index === item.index)
              ? selected?.length
              : selected?.length + 1,
          ),
            console.log('APPEND------------->>>', selected?.length);
        }}>
        <Animatable.View // flatlist render item
          animation={
            bounceLng >= deviceData?.devCount &&
            selected?.some(e => e.pIndex === index)
              ? 'bounceIn'
              : null
          }
          duration={1000}
          style={[
            styles.eachItem,
            {
              ...(selected?.some(e => e.pIndex === index) && {
                borderColor: colors.COLOR_BLUE,
                borderWidth: 4,
              }),
            },
          ]}>
          <View style={styles.listDeviceItems}>
            <Image
              source={item.icon}
              style={[
                styles.listDeviceIcon,
                {
                  ...(selected?.some(e => e.pIndex === index) && {
                    tintColor: colors.COLOR_BLUE,
                  }),
                },
              ]}
            />
            <View style={styles.deviceName}>
              <Text
                style={[
                  styles.listDeviceName,
                  {
                    ...(selected?.some(e => e.pIndex === index) && {
                      color: colors.COLOR_BLUE,
                    }),
                  },
                ]}>
                {item.deviceName}
              </Text>
            </View>
          </View>
        </Animatable.View>
      </TouchableOpacity>

      {expanded === index &&
        deviceData?.devCount > 1 && // if expanded is true and index is equal to index then render sub list
        [...Array(deviceData?.devCount)].map((e, i) => (
          <View style={{width: '100%', alignItems: 'center'}}>
            <TouchableOpacity
              key={i}
              onPress={() => {
                selected?.length < deviceData?.devCount ||
                selected?.some(e => e.pIndex === index && e.cIndex === i)
                  ? setSelected(
                      selected?.some(e => e.pIndex === index && e.cIndex === i)
                        ? selected.filter(e => e.cIndex !== i)
                        : [...selected, {...item, cIndex: i, pIndex: index}],
                    )
                  : setSelected([...selected]);
                setBounceLng(
                  selected?.some(e => e.pIndex === index && e.cIndex === i)
                    ? selected?.length
                    : selected?.length + 1,
                );
              }}
              style={[
                styles.subListDeviceItems,
                {
                  ...(selected.some(
                    e => e.pIndex === index && e.cIndex === i,
                  ) && {
                    backgroundColor: colors.COLOR_BLUE,
                    borderRadius: normalize(10),
                    width: '90%',
                    alignItems: 'center',
                  }),
                },
              ]}>
              <Image
                source={item.icon}
                style={[
                  styles.listDeviceIcon,
                  {tintColor: 'white', marginHorizontal: normalize(10)},
                ]}
              />
              <Text style={[styles.listDeviceName, {color: 'white'}]}>{`${
                item.deviceName
              } ${i + 1}`}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </>
  );

  return (
    <View // main container
      style={styles.mainContainer}>
      <View // logo container
        style={styles.logoImg}>
        <TouchableOpacity // back icon container
          onPress={() => navigation.goBack()}
          style={styles.backIconContainer}>
          <Image // logo image
            source={icons.RIGHT_ARROW} // app logo
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image // logo image
          source={images.APP_LOGO} // app logo
          style={styles.logo}
        />
      </View>
      <Text // choose device text
        style={styles.chooseApplianceTxt}>
        {deviceData.applianceName.replace('Voltage', 'Ampere')}
      </Text>
      <Text // choose device text
        style={styles.deviceCountTxt}>
        {bounceLng > deviceData?.devCount
          ? `You can add upto ${deviceData?.devCount} Device`
          : selected?.length > 0
          ? `${numberToString()} Device`
          : `Choose ${deviceData?.devCount} Device`}
      </Text>

      <View style={styles.listMainContainer}>
        <View style={styles.listContainer}>
          <Text style={styles.chooseDeviceTxt}>
            Choose A Device To Continue
          </Text>

          {deviceData.devType === 'low' ? (
            <FlatList // low voltage devices
              style={styles.list}
              showsVerticalScrollIndicator={false}
              data={lowVoltageDevice}
              renderItem={({item, index}) => (
                <ApplianceList item={item} index={index} />
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <FlatList // high voltage devices
              style={styles.list}
              showsVerticalScrollIndicator={false}
              data={highVoltageDevice}
              renderItem={({item, index}) => (
                <ApplianceList item={item} index={index} />
              )}
              keyExtractor={item => item.id}
            />
          )}
          {selected?.length === deviceData?.devCount && (
            <TouchableOpacity // continue button
              onPress={() => navigation.navigate('WifiStatusIdCheck')}
              style={styles.continueBtn}>
              <Text style={styles.continueTxt}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ApplianceList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  logoImg: {
    height: height * 0.25,
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: height * 0.09,
    width: '80%',
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  backIconContainer: {paddingHorizontal: normalize(15)},
  backIcon: {
    height: normalize(18),
    width: normalize(18),
    transform: [{rotate: '-180deg'}],
    justifyContent: 'flex-start',
  },
  chooseApplianceTxt: {
    fontSize: normalize(13),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLACK,
  },
  deviceCountTxt: {
    fontSize: normalize(14),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLUE,
    marginVertical: normalize(18),
  },
  eachItem: {
    backgroundColor: colors.COLOR_WHITE,
    marginBottom: normalize(14),
    justifyContent: 'center',
    borderRadius: normalize(30),
    width: '100%',
  },
  chooseDeviceTxt: {
    fontSize: normalize(14),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_WHITE,
    marginVertical: normalize(22),
  },
  listDeviceName: {
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLACK,
    fontSize: normalize(14),
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  deviceName: {
    alignItems: 'center',
    width: '50%',
  },
  listDeviceIcon: {
    height: normalize(30),
    width: normalize(30),
    resizeMode: 'contain',
    marginHorizontal: normalize(28),
  },
  listDeviceItems: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    paddingVertical: normalize(4),
    // backgroundColor: 'red',
  },

  subListDeviceItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalize(10),
    alignItems: 'center',
  },

  listMainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(10),
  },
  listContainer: {
    borderRadius: normalize(16),
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PLACEHOLDER_COLOR,
    maxHeight: height * 0.6,
  },
  list: {width: '92%'},
  continueBtn: {
    backgroundColor: colors.COLOR_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    marginVertical: normalize(14),
    paddingVertical: normalize(12),
    borderRadius: normalize(8),
  },
  continueTxt: {
    color: colors.COLOR_WHITE,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(14),
    fontWeight: '500',
    lineHeight: 19,
  },
  checkIcon: {
    borderColor: colors.COLOR_WHITE,
    borderWidth: 1,
    borderRadius: normalize(100),
    padding: normalize(2.5),
  },
  checkDot: {
    backgroundColor: colors.COLOR_WHITE,
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(100),
  },
});
