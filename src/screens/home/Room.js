import {
  Dimensions,
  FlatList,
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
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../constants/images';
import icons from '../../constants/icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/commons/CustomModal';

const {width, height} = Dimensions.get('window');

const Room = ({addElementItem}) => {
  // navigation
  const navigation = useNavigation();

  // show modal
  const [showModal, setShowModal] = useState(false);
  const [roomApplienceCount, setRoomApplienceCount] = useState('');
  const [addElement, setAddElement] = useState([
    {applience: 'Lights', icon: icons.LIGHT_ICON},
    {applience: 'Fan', icon: icons.FAN_ICON},
    {applience: 'Air Conditioner', icon: icons.AC_ICON},
    {applience: 'Geyser', icon: icons.GEYSER_ICON},
    {applience: 'Television', icon: icons.TV_ICON},
  ]);

  const addAppliance = () => {
    setAddElement([...addElement, {applience: roomApplienceCount}]);
    console.log('dcdscdsc');
    setShowModal(false);
    setRoomApplienceCount('');
  };

  return (
    <KeyboardAvoidingView // keyboard avoiding view
      style={{flex: 1, justifyContent: 'center'}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity // back icon container
        onPress={() => navigation.goBack()}
        style={styles.backIconContainer}>
        <Image source={icons.LEFT_ARROW} style={styles.backIcon}></Image>
      </TouchableOpacity>
      <Image // upper background image
        source={images.ROOMS_UPPER_BACKGROUND}
        style={styles.upperBackground}
      />

      <View // main view
        style={{flex: 1}}>
        <ScrollView>
          <View // header container
            style={styles.headerContainer}>
            <View // room heading container
              style={styles.titleTextContainer}>
              <Text style={styles.livingRoomText}>Room 1</Text>
            </View>
          </View>
          <View // each Items
          >
            <Text style={styles.appliencesTxt}>Your Appliances</Text>
            <View // room list container
              style={styles.roomList}>
              {addElement?.map((e, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('Controller')}
                    style={styles.roomInnerContainer}>
                    {e.icon && (
                      <Image source={e.icon} style={styles.applianceIcons} />
                    )}
                    <Text style={styles.applianceNames}>{e.applience}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>

      {showModal ? (
        <CustomModal // custom modal
          dismiss={() => setShowModal(false)}
          visible={showModal}>
          <Pressable>
            <View
              style={{
                height: height * 0.25,
                width: width * 0.88,
                padding: normalize(18),
                alignItems: 'center',
              }}>
              <Text style={styles.roomCountTxt}>
                Enter Appliances Control ID
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={txt => setRoomApplienceCount(txt)}
                value={roomApplienceCount}
              />
              <View style={styles.modalBtnContainer}>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={roomApplienceCount !== '' ? styles.modalbtn : null}>
                  <Text
                    style={
                      roomApplienceCount !== ''
                        ? styles.modalTxtFocus
                        : styles.modalTxt
                    }>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={roomApplienceCount === ''}
                  onPress={addAppliance}
                  style={
                    roomApplienceCount !== ''
                      ? styles.modalbtnFocus
                      : styles.modalbtn
                  }>
                  <Text
                    style={
                      roomApplienceCount !== ''
                        ? styles.modalTxtFocus
                        : styles.modalTxt
                    }>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </CustomModal>
      ) : null}
      <TouchableOpacity // add room button
        style={styles.addBtn}
        onPress={() => setShowModal(true)}>
        <Image source={icons.ADD_ICON} style={styles.addIcon} />
      </TouchableOpacity>
      <Image // lower background image
        source={images.ROOMS_LOWER_BACKGROUND}
        style={styles.lowerBackground}
      />
    </KeyboardAvoidingView>
  );
};

export default Room;

const styles = StyleSheet.create({
  upperBackground: {
    // resizeMode: 'cover',
    position: 'absolute',
    height: '22%',
    width,
    top: 0,
    zIndex: 1,
  },
  lowerBackground: {
    position: 'absolute',
    height: '25%',
    width,
    bottom: -normalize(1),
  },
  background: {flex: 1},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.15,
    zIndex: 2,
  },
  backIconContainer: {
    backgroundColor: colors.COLOR_PRIMARY,
    paddingVertical: normalize(7),
    position: 'absolute',
    top: height * 0.13,
    zIndex: 100,
    paddingHorizontal: normalize(20),
    borderTopEndRadius: normalize(18),
    borderBottomEndRadius: normalize(18),
  },
  backIcon: {
    resizeMode: 'contain',
    height: normalize(22),
    width: normalize(22),
    tintColor: colors.COLOR_WHITE,
  },
  titleTextContainer: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  livingRoomText: {
    fontSize: normalize(20),
    color: colors.PLACEHOLDER_COLOR,
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '500',
    lineHeight: scale(24),
  },

  roomList: {
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: normalize(20),
    paddingHorizontal: normalize(22),
  },
  roomTxt: {
    fontSize: normalize(14),
    fontWeight: '600',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.PLACEHOLDER_COLOR,
  },

  downArrow: {
    resizeMode: 'contain',
    height: normalize(12),
    width: normalize(12),
    transform: [{rotate: '90deg'}],
    marginTop: normalize(3),
    marginLeft: normalize(4),
  },
  addBtn: {
    position: 'absolute',
    bottom: normalize(70),
    right: normalize(30),
    zIndex: 2,
  },
  addIcon: {
    resizeMode: 'contain',
    height: normalize(45),
    width: normalize(45),
  },
  roomCountTxt: {
    fontSize: normalize(16),
    fontWeight: '500',
    lineHeight: scale(22),
    fontFamily: fonts.INTER_SEMIBOLD,
    textAlign: 'center',
  },
  input: {
    borderColor: colors.PLACEHOLDER_COLOR,
    borderWidth: 1,
    borderRadius: normalize(20),
    width: '100%',
    height: '30%',
    marginTop: normalize(22),
    textAlign: 'center',
    fontSize: normalize(18),
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: normalize(22),
    width: '100%',
  },
  modalTxt: {
    fontSize: normalize(16),
    lineHeight: scale(21.78),
    fontWeight: '500',
    color: colors.PLACEHOLDER_COLOR + 25,
  },
  modalbtnFocus: {
    borderColor: colors.PLACEHOLDER_COLOR,
    borderWidth: 1,
    borderRadius: normalize(20),
    width: '40%',
    paddingVertical: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalbtn: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTxtFocus: {
    fontSize: normalize(16),
    lineHeight: scale(21.78),
    fontWeight: '500',
    color: colors.PLACEHOLDER_COLOR,
  },
  appliencesTxt: {
    marginTop: normalize(20),
    paddingHorizontal: normalize(22),
    color: colors.PLACEHOLDER_COLOR,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(16),
    lineHeight: scale(22),
  },
  applianceNames: {
    // paddingVertical: normalize(10),
    color: colors.PLACEHOLDER_COLOR,
    fontSize: normalize(13),
    lineHeight: scale(19),
    fontWeight: '400',
    fontFamily: fonts.INTER_REGULAR,
    marginTop: normalize(6),
  },
  roomInnerContainer: {
    backgroundColor: colors.COLOR_WHITE,
    height: height * 0.16,
    width: width * 0.38,
    marginBottom: normalize(20),
    borderRadius: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  applianceIcons: {
    resizeMode: 'contain',
    height: normalize(40),
    width: normalize(40),
  },
});
