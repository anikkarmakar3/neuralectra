import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import normalize from '../../utils/helpers/normalize';
import icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Header = ({headerTitle, icon}) => {
  const navigation = useNavigation();

  const [logoutModal, setLogoutModal] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState(false);
  return (
    <View>
      <StatusBar barStyle="light-content" translucent={true} />
      <View style={styles.container}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <TouchableOpacity
            onPress={() => {
              setLogoutModal(true);
            }}
            style={styles.iconContainer}>
            <Image source={icons.HAMBURGER_ICON} style={styles.hamburgerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal // logout alert modal
        transparent
        visible={logoutModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setLogoutModal(false);
          }}
          style={styles.logoutModalContainer}>
          <Pressable>
            <TouchableOpacity // logout button
              onPress={() => {
                setLogoutModal(false);
                setLogoutAlert(true);
              }}
              style={styles.logoutContainer}>
              <Image source={icons.LOGOUT_ICON} style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </Pressable>
        </TouchableOpacity>
      </Modal>

      <Modal // logout button modal
        transparent
        visible={logoutAlert}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setLogoutAlert(false);
          }}
          style={styles.modalContainer}>
          <Pressable>
            <View style={styles.logoutAlertContainer}>
              <Text style={styles.roomCountTxt}>
                Are You Sure You Want To Log Out
              </Text>
              <View style={styles.modalBtnContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setLogoutAlert(false);
                  }}
                  style={styles.modalbtnFocus}>
                  <Text style={styles.modalTxtFocus}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login'),
                      setLogoutModal(false),
                      setLogoutAlert(false);
                  }}
                  style={[
                    styles.modalbtnFocus,
                    {backgroundColor: colors.COLOR_BLUE},
                  ]}>
                  <Text
                    style={[styles.modalTxtFocus, {color: colors.COLOR_WHITE}]}>
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.COLOR_PRIMARY,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitleContainer: {
    height: height * 0.12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: normalize(12),
    width,
  },
  headerTitle: {
    color: colors.COLOR_WHITE,
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: normalize(16),
    width: '90%',
  },
  logoutIcon: {
    resizeMode: 'contain',
    height: normalize(15),
    width: normalize(15),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '1%',
  },
  hamburgerIcon: {
    resizeMode: 'contain',
    height: normalize(26),
    width: normalize(26),
    tintColor: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    height: height * 3,
    width: width * 0.85,
    backgroundColor: '#ffffff',
    borderRadius: normalize(12),
    alignItems: 'center',
    padding: normalize(30),
  },
  logoutAlertContainer: {
    height: height * 0.25,
    width: width * 0.85,
    backgroundColor: '#ffffff',
    borderRadius: normalize(12),
    alignItems: 'center',
    padding: normalize(30),
  },
  logoutContainer: {
    height: height * 0.05,
    width: width * 0.35,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: normalize(8),
    borderBottomLeftRadius: normalize(8),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top: normalize(40),
  },
  logoutAContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutModalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    alignItems: 'flex-end',
  },

  logoutText: {
    color: colors.PLACEHOLDER_COLOR,
    fontSize: normalize(14),
    fontFamily: fonts.INTER_MEDIUM,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: normalize(26),
    width: '100%',
  },
  roomCountTxt: {
    fontSize: normalize(13),
    fontWeight: '500',
    lineHeight: 22,
    fontFamily: fonts.INTER_SEMIBOLD,
    textAlign: 'center',
    color: colors.PLACEHOLDER_COLOR,
  },
  modalbtnFocus: {
    borderColor: colors.PLACEHOLDER_COLOR,
    borderWidth: 0.5,
    borderRadius: normalize(20),
    width: '40%',
    paddingVertical: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTxtFocus: {
    fontSize: normalize(12),
    lineHeight: 21.78,
    fontWeight: '500',
    color: colors.PLACEHOLDER_COLOR,
  },
  modalbtnUnfocused: {
    borderColor: colors.GRAY_COLOR,
    borderWidth: 0.5,
    borderRadius: normalize(20),
    width: '40%',
    paddingVertical: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
