import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableOpacityBase,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import icons from '../../constants/icons';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import normalize from '../../utils/helpers/normalize';
import fonts from '../../constants/fonts';
import {roomTabReq} from '../../redux/reducers/TabBarReducer';
import {desviceStatusReq} from '../../redux/reducers/DeviceControllerReducer';

const {height, width} = Dimensions.get('window');

const AllAppliances = ({setActiveTab}) => {
  const DeviceControllerReducer = useSelector(
    state => state.DeviceControllerReducer,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  const [addElement, setAddElement] = useState([
    {appliance: 'Light', icon: icons.BULB_ICON, enabled: false},
  ]);
  const [appControllerModal, setAppControllerModal] = useState(false);
  const [appStatusIdModal, setAppStatusIdModal] = useState(false);

  const [controllerId, setControllerId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [tempControllerId, setTempControllerId] = useState('test.light');
  const [tempStatusId, setTempStatusId] = useState('test.lightfeedback');

  const [applianceData, setApplianceData] = useState({});
  const TabBarReducer = useSelector(state => state.TabBarReducer);

  const data = TabBarReducer.addedAppliances;

  useEffect(() => {
    Object.keys(data)?.length > 0 && setAddElement([...addElement, data]);

    dispatch(desviceStatusReq());
    // console.log(
    //   'DEVVVVV DATAAAAAAAA=====================>',
    //   DeviceControllerReducer,
    // );
  }, [data]);

  return (
    <View>
      <View // back icon container
        style={styles.backIconContainer}>
        <TouchableOpacity
          style={{width: '13%'}}
          onPress={() => {
            setActiveTab('Rooms'), dispatch(roomTabReq('Rooms'));
          }}>
          <Image source={icons.RIGHT_ARROW} style={styles.backIcon}></Image>
        </TouchableOpacity>
        <Text style={styles.headingTitle}>Your Appliances</Text>
      </View>

      <View // room list container
        style={styles.roomList}>
        {addElement?.map((e, index) => {
          return (
            <View key={index}>
              {
                // selected.includes(index) ? (
                DeviceControllerReducer?.deviceStatus?.value === 'ON' ? (
                  <LinearGradient
                    useAngle={true}
                    angle={120}
                    angleCenter={{x: 0.8, y: 0.5}}
                    colors={[colors.COLOR_BLUE, '#00d4ff', '#ffffff']}
                    style={[styles.rooms, {alignItems: 'center'}]}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        console.log(selected);
                        setSelected(selected.filter(e => e !== index));
                        // setAppControllerModal(true);
                        navigation.navigate('Controller', {
                          item: e,
                          allAppliance: true,
                        });
                      }}
                      style={[
                        styles.roomInnerContainer,
                        {
                          width: width * 0.41,
                          height: width * 0.36,
                        },
                      ]}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {e.icon && (
                          <View style={styles.iconRingFill}>
                            <Image
                              source={e.icon}
                              style={[
                                styles.icon,
                                {tintColor: colors.COLOR_WHITE},
                              ]}
                            />
                          </View>
                        )}
                        <Text
                          style={[styles.roomTxt, {color: colors.COLOR_WHITE}]}>
                          {e.appliance}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={index}
                    style={[
                      styles.rooms,
                      {alignItems: 'center', justifyContent: 'space-evenly'},
                    ]}
                    onPress={() => {
                      setSelected([...selected, index]);
                      setApplianceData({...e});
                      setAppControllerModal(true);
                    }}>
                    {e.icon && (
                      <View style={styles.iconRing}>
                        <Image source={e.icon} style={styles.icon}></Image>
                      </View>
                    )}
                    <Text
                      style={[
                        styles.roomTxt,
                        {color: colors.PLACEHOLDER_COLOR},
                      ]}>
                      {e.appliance}
                    </Text>
                  </TouchableOpacity>
                )
              }
            </View>
          );
        })}
      </View>

      <Modal // PUT CONTROLLER ID MODAL
        transparent
        visible={appControllerModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // setTempPayload({});
            setAppControllerModal(false);
            setTempControllerId('');
          }}
          style={styles.modalContainer}>
          <Pressable>
            <View style={styles.mainContainer}>
              <Text style={styles.roomCountTxt}>
                Enter Appliances Controller ID
              </Text>
              {/* set roomcount data in to text field which is coming from reducer */}
              <TextInput
                editable={false}
                style={styles.input}
                value={tempControllerId}
                onChangeText={text => setTempControllerId(text)}
              />

              <View style={styles.modalBtnContainer}>
                <TouchableOpacity // cancel button
                  onPress={() => {
                    setAppControllerModal(false);
                    setTempControllerId('');
                  }}
                  style={tempControllerId === '' && styles.modalbtnUnfocused}>
                  <Text
                    style={
                      tempControllerId === ''
                        ? styles.modalTxtUnfocused
                        : styles.modalTxtFocus
                    }>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity // OK button
                  disabled={tempControllerId === '' ? true : false}
                  onPress={() => {
                    setControllerId(tempControllerId);
                    setAppControllerModal(false);
                    setAppStatusIdModal(true);
                  }} // close this modal and open another modal from here
                  style={
                    tempControllerId === ''
                      ? styles.modalbtnUnfocused
                      : styles.modalbtnFocus
                  }>
                  <Text
                    style={
                      tempControllerId === ''
                        ? styles.modalTxtFocus
                        : styles.modalTxtUnfocused
                    }>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>

      <Modal // PUT APPLIANCE STATUS ID MODAL
        transparent
        visible={appStatusIdModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setAppStatusIdModal(false);
            setTempStatusId('');
          }}
          style={styles.modalContainer}>
          <Pressable>
            <View style={styles.mainContainer}>
              <Text style={styles.roomCountTxt}>Enter Appliance Status ID</Text>
              {/* set roomcount data in to text field which is coming from reducer */}
              <TextInput
                editable={false}
                style={styles.input}
                value={tempStatusId}
                onChangeText={text => setTempStatusId(text)}></TextInput>

              <View style={styles.modalBtnContainer}>
                <TouchableOpacity // cancel button
                  onPress={() => {
                    setAppStatusIdModal(false);
                    setTempStatusId('');
                  }}
                  style={tempStatusId === '' && styles.modalbtnUnfocused}>
                  <Text
                    style={
                      tempStatusId === ''
                        ? styles.modalTxtUnfocused
                        : styles.modalTxtFocus
                    }>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity // OK button
                  disabled={tempStatusId === '' ? true : false}
                  onPress={() => {
                    dispatch(roomTabReq(''));
                    setAppStatusIdModal(false);
                    setTempStatusId(tempStatusId);
                    navigation.navigate('Controller', {
                      item: applianceData,
                      allAppliance: true,
                      controllerId,
                      statusId: tempStatusId,
                    });
                  }}
                  style={
                    tempStatusId === ''
                      ? styles.modalbtnUnfocused
                      : styles.modalbtnFocus
                  }>
                  <Text
                    style={
                      tempStatusId === ''
                        ? styles.modalTxtFocus
                        : styles.modalTxtUnfocused
                    }>
                    OK
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

export default AllAppliances;

const styles = StyleSheet.create({
  roomList: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginTop: normalize(22),
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.3,
    // backgroundColor: 'red',
  },
  roomTxt: {
    fontSize: normalize(12),
    fontWeight: '600',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.PLACEHOLDER_COLOR,
    textAlign: 'center',
    paddingVertical: normalize(10),
  },

  rooms: {
    backgroundColor: colors.COLOR_WHITE,
    height: width * 0.36,
    width: width * 0.41,
    marginBottom: normalize(27),
    borderRadius: normalize(20),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: normalize(12),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  roomInnerContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  statusContainer: {
    marginTop: normalize(28),
  },
  icon: {
    resizeMode: 'contain',
    height: normalize(25),
    width: normalize(25),
    // marginTop: normalize(3),
    // marginLeft: normalize(4),
  },
  statusText: {
    fontWeight: '500',
    fontSize: normalize(11.5),
    color: colors.PLACEHOLDER_COLOR,
    fontFamily: fonts.INTER_MEDIUM,
  },
  backIconContainer: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    width,
  },
  backIcon: {
    resizeMode: 'contain',
    height: normalize(22),
    width: normalize(22),
    transform: [{rotate: '-180deg'}],
  },
  headingTitle: {
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.PLACEHOLDER_COLOR,
    fontWeight: '700',
    fontSize: normalize(14),
    width: '90%',
  },
  iconRing: {
    borderRadius: 100,
    borderColor: colors.COLOR_BLACK,
    borderWidth: 1,
    padding: normalize(5),
  },
  iconRingFill: {
    borderRadius: 100,
    backgroundColor: '#00d4ff' + '50',
    padding: normalize(7),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    height: height * 0.25,
    width: width * 0.85,
    backgroundColor: '#ffffff',
    borderRadius: normalize(12),
    alignItems: 'center',
    padding: normalize(18),
  },
  roomCountTxt: {
    fontSize: normalize(13),
    fontWeight: '500',
    lineHeight: scale(22),
    fontFamily: fonts.INTER_SEMIBOLD,
    textAlign: 'center',
    color: colors.PLACEHOLDER_COLOR,
  },
  input: {
    borderColor: colors.PLACEHOLDER_COLOR,
    borderWidth: 0.7,
    borderRadius: normalize(20),
    width: '100%',
    height: '28%',
    marginTop: normalize(22),
    textAlign: 'center',
    fontSize: normalize(13),
    color: colors.COLOR_BLACK,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(10),
    width: '100%',
    paddingBottom : normalize(40),
    paddingHorizontal: normalize(20),
    alignItems: 'center',
  },
  modalbtnUnfocused: {
    width: '45%',
    paddingVertical: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTxtUnfocused: {
    fontSize: normalize(12),
    lineHeight: scale(21.78),
    justifyContent :'center',
    fontWeight: '500',
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    textAlign: 'center',
  },
  modalbtnFocus: {
    borderColor: colors.PLACEHOLDER_COLOR,
    borderWidth: 1,
    borderRadius: normalize(20),
    width: '45%',
    paddingVertical: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTxtFocus: {
    fontSize: normalize(14),
    lineHeight: scale(21.78),
    fontWeight: '500',
    color: colors.COLOR_BLACK + 50,
    textAlign: 'center',
  },
});
