import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import icons from '../../constants/icons';
import fonts from '../../constants/fonts';
import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Rooms from './Rooms';
import {roomTabReq} from '../../redux/reducers/TabBarReducer';

const {width, height} = Dimensions.get('window');

const Dashboard = ({items, tabData, setActiveTab}) => {
  console.log('COMPONENT------>--->>', tabData);

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Welcome To</Text>
          <Text style={[styles.welcomeText, styles.smartHomeText]}>
            The World of Smart Home
          </Text>
        </View>

        <View // room information texts
          style={styles.roomInfoTxtContainer}>
          <Text style={styles.livingRoomTxt}>Living Room</Text>
          <Text style={styles.tapToEnterTxt}>No. of Rooms: 500</Text>
        </View>

        <TouchableOpacity // tap to enter button
          onPress={() => {
            setActiveTab('Rooms');
            dispatch(roomTabReq('Rooms'));
          }}
          style={styles.tapToEnterContainer}>
          <View style={styles.innerContainer}>
            <View // room image
              style={styles.innerContainerParts}>
              <Image source={icons.ROOM_ICON} style={styles.roomIcon}></Image>
            </View>
            <View // tap to enter text
              style={styles.innerContainerParts}>
              <Text style={styles.tapToEnterTxt}>Tap to enter</Text>
            </View>
            <View // arrow image
              style={styles.innerContainerParts}>
              <Image source={icons.ARROW_ICON} style={styles.arrow}></Image>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  welcomeTextContainer: {
    marginTop: normalize(22),
  },
  welcomeText: {
    fontSize: normalize(14),
    fontFamily: fonts.INTER_MEDIUM,
    lineHeight: scale(22),
    textAlign: 'center',
    color: colors.COLOR_BLUE,
    fontWeight: '400',
    paddingVertical: normalize(8),
  },
  smartHomeText: {
    fontSize: normalize(16),
    fontWeight: '900',
    lineHeight: scale(22),
    color: colors.CUSTOM_BLUE,
  },
  roomInfoTxtContainer: {
    alignItems: 'center',
    padding: normalize(12),
  },
  livingRoomTxt: {
    fontSize: normalize(16),
    fontWeight: '500',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.PLACEHOLDER_COLOR,
    marginBottom: normalize(12),
  },
  tapToEnterContainer: {
    backgroundColor: colors.COLOR_WHITE,
    height: height * 0.11,
    width: width * 0.85,
    marginVertical: normalize(28),
    borderRadius: normalize(20),
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: colors.COLOR_BLACK,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  innerContainerParts: {justifyContent: 'center'},
  roomIcon: {
    height: normalize(50),
    width: normalize(50),
    resizeMode: 'contain',
  },
  tapToEnterTxt: {
    fontSize: normalize(14),
    lineHeight: scale(19),
    fontWeight: '500',
    fontFamily: fonts.INTER_REGULAR,
    textAlign: 'center',
    color: colors.PLACEHOLDER_COLOR,
  },
  arrow: {
    height: normalize(25),
    width: normalize(12),
    resizeMode: 'contain',
  },
});
