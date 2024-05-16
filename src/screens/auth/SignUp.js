import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../constants/images';
import normalize from '../../utils/helpers/normalize';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import TextInputItem from '../../components/commons/TextInputItem';
import icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {width, height} = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  return (
    <KeyboardAwareScrollView>
      <ImageBackground // background image
        source={images.SIGNUP_BACKGROUND}
        style={styles.background}
        imageStyle={{resizeMode: 'stretch'}}>
        <View style={styles.mainContainer}>
          <View style={{paddingBottom: 20}}>
            <View // welcome text
              style={styles.createAccountContainer}>
              <Text style={styles.createAccountTxt}>Sign up !</Text>
              <Text style={styles.createAccountTxt}>Create Your Account</Text>
            </View>
            <TextInputItem // name field
              borderBottomWidth={1}
              width={'90%'}
              placeholder={'Enter Your Name'}
              borderColor={'#263238'}
              color={colors.PLACEHOLDER_COLOR}
              value={name}
              onChangeText={val => setName(val)}
              textAlignVertical={'bottom'}
              textPaddingBottom={0}
              alignTextItem={'flex-end'}
              textColor={colors.PLACEHOLDER_COLOR}
            />
            <TextInputItem // email field
              marginTop={normalize(14)}
              borderBottomWidth={1}
              width={'90%'}
              placeholder={'Enter Your Email'}
              borderColor={colors.PLACEHOLDER_COLOR}
              color={colors.PLACEHOLDER_COLOR}
              value={email}
              onChangeText={val => setEmail(val)}
              textAlignVertical={'bottom'}
              alignTextItem={'flex-end'}
              textPaddingBottom={0}
              textColor={colors.PLACEHOLDER_COLOR}
            />
            <TextInputItem // password field
              marginTop={normalize(14)}
              borderBottomWidth={1}
              width={'90%'}
              placeholder={'Enter Your Password'}
              borderColor={colors.PLACEHOLDER_COLOR}
              isSecure={passwordVisible}
              value={password}
              onChangeText={val => setPassword(val)}
              isRightIconVisible={true}
              onrightimpress={() => setPasswordVisible(!passwordVisible)}
              rightimage={passwordVisible ? icons.EYE_CLOSE : icons.EYE_OPEN}
              textAlignVertical={'bottom'}
              alignTextItem={'flex-end'}
              textPaddingBottom={0}
              textColor={colors.PLACEHOLDER_COLOR}
            />
            <TextInputItem // confirm password field
              marginTop={normalize(14)}
              borderBottomWidth={1}
              width={'90%'}
              placeholder={'Confirm Your Password'}
              borderColor={colors.PLACEHOLDER_COLOR}
              isSecure={confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={val => setConfirmPassword(val)}
              isRightIconVisible={true}
              textAlignVertical={'bottom'}
              alignTextItem={'flex-end'}
              textPaddingBottom={0}
              textColor={colors.PLACEHOLDER_COLOR}
              onrightimpress={() =>
                setConfirmPasswordVisible(!confirmPasswordVisible)
              }
              rightimage={
                confirmPasswordVisible ? icons.EYE_CLOSE : icons.EYE_OPEN
              }
            />
          </View>
          <TouchableOpacity // sign in button
            onPress={() => navigation.navigate('ChooseAppliance')}
            style={styles.signinBtn}>
            <Text style={styles.signinTxt}>Sign In</Text>
          </TouchableOpacity>
          <View //  have an account
            style={styles.signinContainer}>
            <Text style={styles.haveAc}>have an account? </Text>
            <TouchableOpacity // login button
              onPress={() => navigation.navigate('BottomTab')}>
              <Text style={styles.loginTxt}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  background: {flex: 1},
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height,
    width,
  },
  signupTextContainer: {
    marginBottom: normalize(28),
  },
  createAccountContainer: {
    marginBottom: normalize(12),
  },
  createAccountTxt: {
    fontSize: normalize(22),
    fontWeight: '500',
    lineHeight: scale(26),
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    textTransform: 'capitalize',
    margin: normalize(5),
  },
  signupTxt: {
    fontSize: normalize(22),
    fontWeight: '500',
    lineHeight: scale(26),
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    textTransform: 'capitalize',
    margin: normalize(5),
  },
  signinBtn: {
    backgroundColor: colors.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.13,
    width: '70%',
    borderRadius: normalize(40),
    marginTop: width * 0.03,
    marginTop: normalize(36),
  },
  signinTxt: {
    color: colors.COLOR_WHITE,
    fontSize: normalize(13),
    lineHeight: scale(22),
    fontWeight: '600',
    fontFamily: fonts.INTER_SEMIBOLD,
  },
  haveAc: {
    textTransform: 'capitalize',
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: scale(22),
  },
  signupTxt: {
    textTransform: 'capitalize',
    color: colors.COLOR_BLUE,
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: scale(22),
  },
  signinContainer: {
    flexDirection: 'row',
    marginTop: normalize(24),
    paddingBottom: normalize(30),
  },
  loginTxt: {
    textTransform: 'capitalize',
    color: colors.COLOR_BLUE,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: scale(22),
    textDecorationLine: 'underline',
  },
});
