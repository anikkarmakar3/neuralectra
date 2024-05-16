import {
  BackHandler,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import icons from '../../constants/icons';
import images from '../../constants/images';
import {useNavigation} from '@react-navigation/native';
import normalize from '../../utils/helpers/normalize';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import TextInputItem from '../../components/commons/TextInputItem';
const {width, height} = Dimensions.get('window');

const WifiStatusIdProvide = () => {
  const navigation = useNavigation();
  const [statusId, setStatusId] = useState('');
  const [verifyId, setVerifyId] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{height, width}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <ScrollView // main container
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
          <Image // info icon
            source={icons.INFO_ICON}
            style={styles.infoIcon}
          />
          <Text // info text
            style={styles.infoText}>
            Please Provide Product ID To Proceed
          </Text>
        </View>
        <View // lower container
          style={styles.lowerContainer}>
          <View // gray container
            style={styles.loawerMainContainer}>
            <View // white container
              style={styles.lowerContent}>
              <Text style={styles.provideIdText}>
                Please Provide Product ID:
              </Text>
              <View // input container
                style={styles.content}>
                <TextInputItem // input field
                  boxBorderColor={colors.LIGHT_GRAY_COLOR}
                  paddingBottom={0}
                  borderWidth={0.6}
                  width={'90%'}
                  height={height * 0.05}
                  textInputLeft={normalize(8)}
                  value={statusId}
                  onChangeText={txt => setStatusId(txt)}
                  borderRadius={8}
                  alignTextItem={'center'}
                  textColor={colors.PLACEHOLDER_COLOR}
                />
                <TouchableOpacity // verify button
                  disabled={statusId === ''}
                  onPress={() => setVerifyId(true)}
                  style={[
                    styles.verifyBtn,
                    {
                      backgroundColor:
                        statusId === ''
                          ? colors.COLOR_PRIMARY + 50
                          : colors.COLOR_PRIMARY,
                    },
                  ]}>
                  <Text // verify text
                    style={styles.verifyTxt}>
                    {verifyId ? 'Verified' : 'Verify'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {verifyId && (
              <View // product id verified
                style={styles.verifiedTextContainer}>
                <Text style={styles.verifiedText}>
                  your product ID has been verified
                </Text>
                <View // continue button
                  style={styles.verifiedTextContainer}>
                  <Text style={styles.verifiedText}>
                    press continue to proceed
                  </Text>
                </View>

                <TouchableOpacity // continue button
                  onPress={() => navigation.navigate('ConnectToWifi')}
                  style={styles.continueBtn}>
                  <Text style={styles.continueText}>continue</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WifiStatusIdProvide;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width,
  },
  logoContainer: {
    height: height * 0.256,
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: height * 0.12,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {height: normalize(18), width: normalize(18)},
  infoText: {
    fontSize: normalize(13),
    fontWeight: '500',
    color: colors.COLOR_BLACK,
    textAlign: 'center',
    marginLeft: normalize(3),
    fontFamily: fonts.INTER_MEDIUM,
  },
  lowerContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(22),
    paddingBottom: normalize(15),
    height: '65%',
  },
  loawerMainContainer: {
    width: '92%',
    backgroundColor: colors.PLACEHOLDER_COLOR,
    borderRadius: normalize(18),
    alignItems: 'center',
    paddingVertical: normalize(12),
    height: height * 0.56,
  },
  lowerContent: {
    backgroundColor: colors.COLOR_WHITE,
    width: '90%',
    borderRadius: normalize(8),
    justifyContent: 'center',
    marginTop: height * 0.05,
  },
  provideIdText: {
    color: colors.COLOR_BLACK,
    fontSize: normalize(11.5),
    fontWeight: '500',
    lineHeight: 17,
    fontFamily: fonts.INTER_MEDIUM,
    margin: normalize(18),
  },
  content: {
    alignItems: 'center',
  },
  verifyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.COLOR_PRIMARY,
    width: width * 0.55,
    height: height * 0.055,
    borderRadius: normalize(6),
    marginVertical: normalize(20),
  },
  verifyTxt: {
    color: colors.COLOR_WHITE,
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '500',
    lineHeight: 17,
    fontSize: normalize(12),
  },
  verifiedTextContainer: {
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: height * 0.02,
  },
  verifiedText: {
    textAlign: 'center',
    fontSize: normalize(11.5),
    lineHeight: 18,
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: colors.COLOR_WHITE,
  },
  continueBtn: {
    backgroundColor: colors.COLOR_WHITE,
    width: '62%',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.05,
    borderRadius: normalize(6),
  },
  continueText: {
    textAlign: 'center',
    fontSize: normalize(11.5),
    lineHeight: 18,
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: colors.COLOR_PRIMARY,
  },
});
