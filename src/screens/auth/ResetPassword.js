import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../constants/images';
import icons from '../../constants/icons';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import normalize from '../../utils/helpers/normalize';
import TextInputItem from '../../components/commons/TextInputItem';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');

const ResetPassword = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  return (
    <KeyboardAwareScrollView>
      <ImageBackground // background image
        source={images.RESET_PASSWORD_BACKGROUND}
        style={styles.background}
        imageStyle={{resizeMode: 'stretch'}}>
        <View style={styles.mainContainer}>
          <View style={{paddingBottom: 20}}>
            <View style={styles.verifyAccountContainer}>
              <TouchableOpacity // back button
                onPress={() => navigation.goBack()}>
                <Image source={icons.LEFT_ARROW} style={styles.leftArrowImg} />
              </TouchableOpacity>
              <Text style={styles.verifyAccountTxt}>Reset Password</Text>
            </View>

            <TextInputItem // password field
              marginTop={normalize(26)}
              borderBottomWidth={1}
              width={'90%'}
              placeholder={'Enter Your Password'}
              borderColor={'#263238'}
              isSecure={passwordVisible}
              value={password}
              onChangeText={val => setPassword(val)}
              isRightIconVisible={true}
              textAlignVertical={'bottom'}
              textPaddingBottom={0}
              onrightimpress={() => setPasswordVisible(!passwordVisible)}
              alignTextItem={'flex-end'}
              textColor={colors.PLACEHOLDER_COLOR}
              rightimage={passwordVisible ? icons.EYE_CLOSE : icons.EYE_OPEN}
            />
            <TextInputItem // confirm password field
              marginTop={normalize(22)}
              borderBottomWidth={1}
              width={'90%'}
              placeholder={'Confirm Your Password'}
              borderColor={'#263238'}
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
          <TouchableOpacity // continue button
            onPress={() => navigation.navigate('ChooseAppliance')}
            style={styles.continueBtn}>
            <Text style={styles.continueTxt}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  background: {flex: 1},
  verifyAccountContainer: {
    marginBottom: normalize(40),
  },
  mainContainer: {
    alignItems: 'center',
    height,
    width,
  },
  leftArrowImg: {
    height: normalize(20),
    width: normalize(12),
    marginTop: height * 0.18,
    marginBottom: height * 0.02,
  },
  verifyAccountTxt: {
    fontSize: normalize(18),
    fontWeight: '500',
    lineHeight: 26,
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    textTransform: 'capitalize',
    margin: normalize(12),
    textAlign: 'center',
  },
  continueBtn: {
    backgroundColor: colors.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.13,
    width: '70%',
    borderRadius: normalize(40),
    marginTop: width * 0.15,
  },
  continueTxt: {
    color: colors.COLOR_WHITE,
    fontSize: normalize(13),
    fontFamily: fonts.INTER_SEMIBOLD,
    lineHeight: 22,
    fontWeight: '500',
  },
});
