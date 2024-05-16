import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import icons from '../../constants/icons';
import images from '../../constants/images';
import {useNavigation} from '@react-navigation/native';
import normalize from '../../utils/helpers/normalize';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
const {width, height} = Dimensions.get('window');

const WifiStatusIdCheck = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View // main container
      style={styles.mainContainer}>
      <View // logo container
        style={styles.logoImg}>
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
        <View // big image container
          style={styles.galleryImgContainer}>
          <Image // big image
            source={icons.GALLERY_ICON}
            style={styles.galleryImg}
          />
        </View>
        <View // description text container
          style={styles.descTextContainer}>
          <Text // description text
            style={styles.descText}>
            Before Giving The Product ID, Please Press The Reset Button (RST)
            Physically On The Device To Generate The Wifi From The Device As
            Shown In The Picture Above.
          </Text>
        </View>

        <View // press to agree button
          style={styles.agreeContainer}>
          <Text // press to agree text
            style={styles.agreeText}>
            Press agree to continue
          </Text>
        </View>

        <TouchableOpacity // agree button
          onPress={() => navigation.navigate('WifiStatusIdProvide')}
          style={styles.agreeBtn}>
          <Text // agree text
            style={styles.agreeBtnText}>
            Agree
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WifiStatusIdCheck;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width,
    // alignItems: 'center',
  },
  logoImg: {
    height: '32%',
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
  middleContainer: {justifyContent: 'center', alignItems: 'center', width},
  galleryImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.09,
  },
  galleryImg: {
    resizeMode: 'contain',
    height: height * 0.3,
    width: width * 0.3,
  },
  descTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.25,
    width,
  },
  descText: {
    textAlign: 'center',
    width: '90%',
    fontSize: normalize(11.5),
    fontWeight: '500',
    lineHeight: 25,
    fontFamily: fonts.INTER_MEDIUM,
    // textTransform: 'capitalize',
    color: colors.COLOR_BLACK,
    textAlign: 'center',
  },
  agreeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  agreeText: {
    textAlign: 'center',
    width: '90%',
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: 25,
    fontFamily: fonts.INTER_MEDIUM,
    textTransform: 'capitalize',
    color: colors.COLOR_PRIMARY,
    textDecorationLine: 'underline',
  },
  agreeBtn: {
    backgroundColor: colors.COLOR_BLUE,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06,
    marginTop: normalize(38),
    borderRadius: normalize(12),
  },
  agreeBtnText: {
    textAlign: 'center',
    width: '90%',
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: 25,
    fontFamily: fonts.INTER_BOLD,
    textTransform: 'capitalize',
    color: colors.COLOR_WHITE,
    textAlign: 'center',
  },
});
