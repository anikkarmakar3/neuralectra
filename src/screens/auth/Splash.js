import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import images from '../../constants/images';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding'); // navigation
    }, 3000);
  }, []);

  return (
    <ImageBackground // background image
      source={images.SPLASH_BACKGROUND}
      style={styles.background}
      imageStyle={{resizeMode: 'stretch'}}>
      <View style={styles.logoContainer}>
        <Image
          source={images.APP_LOGO} // app logo
          style={styles.logo}
        />
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {flex: 1},
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
});
