import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import images from '../../constants/images';
import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import icons from '../../constants/icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const YourRooms = () => {
  // navigation
  const navigation = useNavigation();
  return (
    <ImageBackground // background image
      source={images.YOUR_ROOMS_BACKGROUND}
      style={styles.background}
      imageStyle={{resizeMode: 'stretch'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            height,
            width,
          }}>
          <View style={{width: '90%'}}>
            <View // welcome texts
              style={styles.welcomeTxtContainer}>
              <Text style={styles.welcomeTxt}>Welcome to</Text>
              <Text style={styles.applicationTxt}>
                Neuralectra Applications
              </Text>
              <Text style={styles.automationHubTxt}>The Automation Hub</Text>
              <View // bar one
                style={styles.barOne}></View>
              <View // bar two
                style={styles.barTwo}></View>
            </View>
          </View>
          <View // room information texts
            style={styles.roomInfoTxtContainer}>
            <Text style={styles.livingRoomTxt}>Living Room</Text>
            <Text style={styles.roomCountTxt}>No. of Rooms: 500</Text>
          </View>

          <TouchableOpacity // tap to enter button
            onPress={() => navigation.navigate('LivingRoom')}
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

          <TouchableOpacity // logout button
            style={styles.logoutImgContainer}
            onPress={() => navigation.navigate('Login')}>
            <Image // logout image
              source={icons.LOGOUT_ICON}
              style={styles.logoutImg}></Image>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default YourRooms;

const styles = StyleSheet.create({
  background: {flex: 1},
  welcomeTxtContainer: {
    marginBottom: normalize(5),
  },
  welcomeTxt: {
    fontSize: normalize(14),
    fontWeight: '500',
    lineHeight: scale(22),
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    marginBottom: normalize(5),
  },
  applicationTxt: {
    fontSize: normalize(20),
    fontWeight: '900',
    fontFamily: fonts.INTER_BOLD,
    color: colors.COLOR_PRIMARY,
    lineHeight: scale(22),
    marginVertical: normalize(16),
  },
  automationHubTxt: {
    fontSize: normalize(12),
    fontWeight: '400',
    lineHeight: scale(22),
    fontStyle: 'italic',
  },
  barOne: {
    backgroundColor: '#68D0E8',
    width: width * 0.38,
    height: '2%',
    marginVertical: normalize(6),
  },
  barTwo: {
    backgroundColor: '#407BFF',
    width: width * 0.18,
    height: '2%',
  },
  roomInfoTxtContainer: {
    alignItems: 'center',
    padding: normalize(12),
  },
  livingRoomTxt: {
    fontSize: normalize(18),
    fontWeight: '500',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.PLACEHOLDER_COLOR,
  },
  roomCountTxt: {
    fontSize: normalize(14),
    fontWeight: '500',
    fontFamily: fonts.INTER_REGULAR,
    color: colors.PLACEHOLDER_COLOR,
    textAlign: 'center',
    marginTop: normalize(4),
  },
  tapToEnterContainer: {
    backgroundColor: 'white',
    height: height * 0.12,
    width: width * 0.85,
    marginVertical: normalize(30),
    borderRadius: normalize(20),
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
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
  logoutImgContainer: {
    marginTop: height * 0.01,
  },
  logoutImg: {
    height: normalize(55),
    width: normalize(55),
    resizeMode: 'contain',
  },
});
