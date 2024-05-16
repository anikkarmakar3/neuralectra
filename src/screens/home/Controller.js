import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
} from 'react-native';
import Slider from 'rn-range-slider';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';

import Header from '../../components/commons/Header';
import icons from '../../constants/icons';
import fonts from '../../constants/fonts';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import colors from '../../constants/colors';
import normalize from '../../utils/helpers/normalize';
import SwitchComponent from '../../components/commons/SwitchComponent';
import {useDispatch, useSelector} from 'react-redux';
import {roomTabReq} from '../../redux/reducers/TabBarReducer';
import {
  desviceStatusReq,
  deviceOnReq,
} from '../../redux/reducers/DeviceControllerReducer';

const {width, height} = Dimensions.get('window');

const THUMB_RADIUS_LOW = 15;
const THUMB_RADIUS_HIGH = 12;
const Controller = ({navigation, route}) => {
  console.log('------>>ROUTE DATA', route);
  const DeviceControllerReducer = useSelector(
    state => state.DeviceControllerReducer,
  );

  console.log('LOGGG===>', DeviceControllerReducer);

  const dispatch = useDispatch();
  const item = route.params.item;
  console.log(item.appliance);
  // navigation
  // const navigation = useNavigation();
  const [switchValueOne, setSwitchValueOne] = useState(false);
  const [switchValueTwo, setSwitchValueTwo] = useState(false);
  const [rotate, setRotate] = useState(false);

  const rotateValue = useRef(new Animated.Value(0)).current; // Makes animated value

  useEffect(() => {
    dispatch(desviceStatusReq());
  }, []);

  // switch toggle function
  const toggleSwitch = value => {
    console.log(value);
    let obj = {
      value: value ? 'ON' : 'OFF',
      applianceId:
        route?.params?.controllerId || DeviceControllerReducer?.applianceId,
    };
    console.log(obj);
    dispatch(deviceOnReq(obj));
  };
  // DeviceControllerReducer data handling
  useEffect(() => {
    DeviceControllerReducer.status === 'DeviceController/deviceOnSuccess' &&
      setSwitchValueOne(
        DeviceControllerReducer.deviceStatus?.value === 'ON' ? true : false,
      );

    DeviceControllerReducer.status ===
      'DeviceController/desviceStatusSuccess' &&
      setSwitchValueOne(
        DeviceControllerReducer.deviceData?.[0]?.value === 'ON' ? true : false,
      );
  }, [DeviceControllerReducer.status]);

  // switch toggle function
  const toggleSwitchTwo = value => {
    setSwitchValueTwo(value);
  };

  const rotateImage = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000, // Adjust the duration as per your requirement
      useNativeDriver: true,
    }).start();
  };

  const rotateAnimation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // time picker
  const [date, setDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  // range slider
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(4);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(4);
  const renderRail = () => <View style={styles.rail} />;
  const renderRailSelected = () => <View style={styles.railSelected} />;
  const renderThumb = () => (
    <View style={styles.rootLow}>
      <Text style={styles.thumbText}>{low}</Text>
    </View>
  );
  const handleValueChange = (lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
  };

  return (
    <KeyboardAvoidingView // keyboard avoiding view
      style={{flex: 1, justifyContent: 'center'}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <Header headerTitle={'Room 1'} />

      <View // header container
        style={styles.headerContainer}>
        <TouchableOpacity // back icon container
          onPress={() => {
            dispatch(roomTabReq('Rooms'));
            navigation.goBack();
          }}
          style={styles.backIconContainer}>
          <Image source={icons.RIGHT_ARROW} style={styles.backIcon}></Image>
        </TouchableOpacity>
        <View // room heading container
          style={styles.titleTextContainer}>
          <Text style={styles.livingRoomText}>
            {route?.params?.allAppliance
              ? item?.appliance
              : item?.currentAppliance}{' '}
            Controller
          </Text>
        </View>
      </View>
      <View style={styles.divider}></View>
      <ScrollView // main view
        style={{flex: 1}}>
        <View style={styles.upperContainer}>
          <View // all item contaier
            style={styles.itemContainer}>
            <View // bulb and switch container
              style={styles.itemRow}>
              <View style={{marginLeft: normalize(16)}}>
                <Image style={styles.bulbIcon} source={item?.icon} />
              </View>
              <View style={styles.switchContainer}>
                <SwitchComponent
                  active={switchValueOne}
                  onChange={toggleSwitch}
                />
              </View>
            </View>

            <View // on off text container
              style={styles.itemRow}>
              <Text style={styles.lightText}>
                {route?.params?.allAppliance
                  ? item?.appliance
                  : item?.currentAppliance}
              </Text>
              <Text style={styles.onOffText}>
                {switchValueOne ? 'On' : 'Off'}
              </Text>
            </View>

            <View // switch State
              style={styles.itemRow}>
              <Text style={styles.onOffText}>Switch State:</Text>
            </View>

            <View // last row container
              style={styles.itemRow}>
              <Text style={styles.onOffText}>
                {' '}
                {route?.params?.allAppliance
                  ? item?.appliance
                  : item?.currentAppliance}
              </Text>
              <TouchableOpacity style={styles.onOfBtn}>
                <Text style={styles.onOfBtnText}>
                  {switchValueOne ? 'On' : 'Off'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={rotateImage}>
                <Animated.View style={{transform: [{rotate: rotateAnimation}]}}>
                  <Image
                    source={icons.REFRESH_ICON}
                    style={{
                      resizeMode: 'contain',
                      height: normalize(35),
                      width: normalize(35),
                    }}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {item?.appliance === 'Fan' || item?.currentAppliance === 'Fan' ? (
          <View style={styles.fanControll}>
            <Text style={styles.forFan}>Regulate Your Fan Speed</Text>

            <View style={styles.root}>
              <Slider
                style={styles.slider}
                min={min}
                max={max}
                step={1}
                disableRange={true}
                floatingLabel={true}
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                onValueChanged={handleValueChange}
              />
            </View>
          </View>
        ) : null}

        <View
          style={{
            alignItems: 'center',
            width: '100%',
            marginBottom: normalize(120),
          }}>
          <View // all item contaier
            style={styles.itemContainer}>
            <View // bulb and switch container
              style={styles.itemRow}>
              <View style={{marginLeft: normalize(16)}}>
                <Text style={styles.livingRoomText}>
                  Timer:{' '}
                  {switchValueTwo ? (
                    <Text
                      style={[
                        styles.livingRoomText,
                        {
                          color: colors.BORDER_BLUE,
                        },
                      ]}>
                      On
                    </Text>
                  ) : (
                    <Text style={[styles.livingRoomText, {color: colors.RED}]}>
                      Off
                    </Text>
                  )}
                </Text>
              </View>
              <View style={{marginRight: normalize(14)}}>
                <SwitchComponent
                  active={switchValueTwo}
                  onChange={toggleSwitchTwo}
                />
              </View>
            </View>

            <View // light on off text container
              style={styles.itemRow}>
              <Text
                style={
                  switchValueTwo ? styles.onOffText : styles.onOffTextClose
                }>
                From Time
              </Text>
              <Text
                style={
                  switchValueTwo ? styles.onOffText : styles.onOffTextClose
                }>
                To Time
              </Text>
            </View>

            <View // last row container
              style={styles.itemRow}>
              <TouchableOpacity // FROM TIME
                style={[
                  styles.timerBtn,
                  {
                    borderColor: switchValueTwo
                      ? colors.COLOR_BLACK
                      : colors.GRAY_COLOR,
                  },
                ]}
                onPress={() => setOpen(true)}>
                <Text
                  style={[
                    styles.time,
                    {
                      color: switchValueTwo
                        ? colors.COLOR_BLACK
                        : colors.GRAY_COLOR,
                    },
                  ]}>
                  {date.getHours() + ' : ' + date.getMinutes()}
                  {date.getHours() < 12 ? ' AM' : ' PM'}
                </Text>
                <Image
                  source={icons.ARROW_ICON}
                  style={[
                    styles.downArrow,
                    {
                      tintColor: switchValueTwo
                        ? colors.COLOR_BLACK
                        : colors.GRAY_COLOR,
                    },
                    ,
                  ]}></Image>
              </TouchableOpacity>

              <DatePicker
                modal
                open={open}
                mode="time"
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <TouchableOpacity // TO TIME
                style={[
                  styles.timerBtn,
                  {
                    borderColor: switchValueTwo
                      ? colors.COLOR_BLACK
                      : colors.GRAY_COLOR,
                  },
                ]}
                onPress={() => setToOpen(true)}>
                <Text
                  style={[
                    styles.time,
                    {
                      color: switchValueTwo
                        ? colors.COLOR_BLACK
                        : colors.GRAY_COLOR,
                    },
                  ]}>
                  {toDate.getHours() + ' : ' + toDate.getMinutes()}
                  {toDate.getHours() < 12 ? ' AM' : ' PM'}
                </Text>
                <Image
                  source={icons.ARROW_ICON}
                  style={[
                    styles.downArrow,
                    {
                      tintColor: switchValueTwo
                        ? colors.COLOR_BLACK
                        : colors.GRAY_COLOR,
                    },
                  ]}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                open={toOpen}
                mode="time"
                date={toDate}
                onConfirm={toDate => {
                  setToOpen(false);
                  setToDate(toDate);
                }}
                onCancel={() => {
                  setToOpen(false);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Controller;

const styles = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    flex: 1,
  },
  slider: {
    marginTop: normalize(14),
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.03,
    zIndex: 2,
  },
  backIconContainer: {
    paddingHorizontal: normalize(7),
  },
  backIcon: {
    resizeMode: 'contain',
    height: normalize(18),
    width: normalize(55),
    transform: [{rotate: '-180deg'}],
  },
  titleTextContainer: {
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  divider: {
    width,
    height: normalize(1.2),
    marginVertical: normalize(10),
    backgroundColor: colors.GRAY_COLOR,
  },
  upperContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: normalize(22),
  },
  livingRoomText: {
    fontSize: normalize(14),
    color: colors.PLACEHOLDER_COLOR,
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '500',
    lineHeight: scale(24),
    textTransform: 'capitalize',
  },
  itemContainer: {
    marginTop: normalize(16),
    width: '90%',
    marginBottom: normalize(20),
    borderRadius: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: colors.COLOR_WHITE,
    elevation: 2,
    padding: normalize(10),
  },
  appliencesTxt: {
    marginTop: normalize(20),
    paddingHorizontal: normalize(22),
    color: colors.PLACEHOLDER_COLOR,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(14),
    lineHeight: scale(22),
    textTransform: 'capitalize',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 22,
  },
  switchStateTxt: {
    fontSize: normalize(14),
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '500',
    color: colors.COLOR_BLACK,
  },
  bulbIcon: {
    resizeMode: 'contain',
    height: height * 0.08,
    width: width * 0.08,
  },
  switchContainer: {marginRight: normalize(14)},
  lightText: {
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(13),
    lineHeight: scale(22),
    fontWeight: '400',
    marginHorizontal: normalize(18),
  },
  onOffText: {
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(13),
    lineHeight: scale(22),
    fontWeight: '400',
    marginHorizontal: normalize(18),
  },
  onOffTextClose: {
    color: colors.GRAY_COLOR,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(13),
    lineHeight: scale(22),
    fontWeight: '400',
    marginHorizontal: normalize(18),
  },
  onOfBtn: {
    backgroundColor: colors.COLOR_PRIMARY,
    padding: normalize(8),
    width: '25%',
    borderRadius: normalize(12),
  },
  timerBtn: {
    borderColor: colors.COLOR_BLACK,
    borderWidth: 1,
    borderRadius: 12,
    padding: normalize(12),
    marginHorizontal: normalize(12),
    flexDirection: 'row',
  },
  onOfBtnText: {
    fontSize: normalize(14),
    fontWeight: '400',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_WHITE,
    textAlign: 'center',
  },
  downArrow: {
    resizeMode: 'contain',
    height: normalize(12),
    width: normalize(12),
    transform: [{rotate: '90deg'}],
    marginTop: normalize(2),
    marginLeft: normalize(12),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fanControll: {
    paddingHorizontal: normalize(22),
  },
  forFan: {
    fontSize: normalize(12),
    textTransform: 'capitalize',
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    textAlign: 'center',
  },
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 2,
    borderColor: '#2074F7',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rail: {
    flex: 1,
    height: normalize(20),
    backgroundColor: '#407BFF' + 20,
    borderRadius: normalize(12),
  },
  railSelected: {
    height: normalize(20),
    borderRadius: 2,
    backgroundColor: '#2074F7',
    borderRadius: normalize(12),
  },
  thumbText: {
    color: '#263238',
    fontSize: normalize(10),
    fontFamily: fonts.INTER_MEDIUM,
  },
});
