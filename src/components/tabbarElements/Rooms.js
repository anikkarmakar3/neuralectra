import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import icons from '../../constants/icons';
import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {addRoomReq, roomTabReq} from '../../redux/reducers/TabBarReducer';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {height, width} = Dimensions.get('window');

const Rooms = ({setActiveTab}) => {
  // add room items
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [roomCountTxt, setRoomCountTxt] = useState(0); // store the room count value
  const [tempRoomData, setTempRoomData] = useState({}); // store the data of the room to be edited
  const [addElement, setAddElement] = useState([]);
  const dispatch = useDispatch();
  const TabBarReducer = useSelector(state => state.TabBarReducer);
  const data = TabBarReducer.addedRoom;

  useEffect(() => {
    Object.keys(data)?.length > 0 && setAddElement([...data]);
  }, [data]);

  const editRoomCount = () => {
    dispatch(
      addRoomReq([
        ...[...addElement]?.map(
          (
            e, // map through all the elements and check if id matches then update roomCount value else return same object
          ) =>
            e.id === tempRoomData?.id // if id matches then update roomCount value else return same object
              ? {...e, roomCount: tempRoomData.roomCount} // update roomCount value
              : e, // return same object
        ),
      ]),
    );
    setTempRoomData({}); // reset tempRoomData
    setModal(false);
  };
  const deleteRoom = () => {
    dispatch(
      addRoomReq([...addElement]?.filter(e => e.id !== tempRoomData.id)), // filter out the element with id matching tempRoomData id
    );
    setTempRoomData({});
    setDeleteModal(false);
  };

  return (
    <KeyboardAvoidingView
      style={{height, width}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View>
        <View // back icon container
          style={styles.backIconContainer}>
          <TouchableOpacity
            style={{width: '13%'}}
            onPress={() => {
              setActiveTab('Dash Board'), dispatch(roomTabReq('Dash Board'));
            }}>
            <Image source={icons.RIGHT_ARROW} style={styles.backIcon}></Image>
          </TouchableOpacity>
          <Text style={styles.headingTitle}>Your Rooms</Text>
        </View>

        <View // room list container
          style={styles.roomList}>
          {addElement?.map((e, index) => {
            return (
              <View key={index}>
                {e.status ? (
                  <LinearGradient
                    useAngle={true}
                    angle={120}
                    angleCenter={{x: 0.8, y: 0.5}}
                    colors={[colors.COLOR_BLUE, '#00d4ff', '#ffffff']}
                    style={[
                      styles.rooms,
                      {justifyContent: 'center', alignItems: 'center'},
                    ]}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        setSelected(selected.filter(e => e !== index));
                        setActiveTab('All Appliances');
                        dispatch(roomTabReq('All Appliances'));
                      }}>
                      <View style={styles.roomInnerContainer}>
                        <Text style={[styles.roomTxt]}>Room {e.roomCount}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            setModal(true);
                          }}>
                          <Image
                            source={icons.ARROW_ICON}
                            style={[
                              styles.downArrow,
                              {tintColor: colors.COLOR_WHITE},
                            ]}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.statusContainer}>
                        <Text style={[styles.roomTxt, styles.statusText]}>
                          Status: On
                        </Text>

                        <Text style={[styles.roomTxt, styles.statusText]}>
                          Time: 00:00 pm
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={index}
                    style={styles.rooms}
                    onPress={() => {
                      setActiveTab('All Appliances');
                      dispatch(roomTabReq('All Appliances'));
                    }}>
                    <View style={styles.roomInnerContainer}>
                      <Text
                        style={[
                          styles.roomTxt,
                          {color: colors.PLACEHOLDER_COLOR},
                        ]}>
                        Room {e.roomCount}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setTempRoomData({...e});
                          setModal(true);
                        }}>
                        <Image
                          source={icons.ARROW_ICON}
                          style={styles.downArrow}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setTempRoomData({...e});
                        setDeleteModal(true);
                      }}
                      style={styles.del}>
                      <Image
                        source={icons.DELETE_ICON}
                        style={styles.delIcon}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        <Modal // edit room modal
          transparent
          visible={modal}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setTempRoomData({});
              setModal(false);
            }}
            style={styles.modalContainer}>
            <Pressable>
              <View style={styles.mainContainer}>
                <Text style={styles.roomCountTxt}>Name Rooms</Text>
                {/* set roomcount data in to text field which is coming from reducer */}
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  value={tempRoomData?.roomCount?.toString()}
                  onChangeText={text => {
                    setTempRoomData({
                      ...tempRoomData,
                      roomCount: Number(text),
                    });
                  }}
                />

                <View style={styles.modalBtnContainer}>
                  <TouchableOpacity // cancel button
                    onPress={() => {
                      setModal(false);
                    }}
                    style={roomCountTxt && styles.modalbtnUnfocused}>
                    <Text
                      style={
                        roomCountTxt
                          ? styles.modalTxtUnfocused
                          : styles.modalTxtFocus
                      }>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity // OK button
                    disabled={
                      !tempRoomData?.roomCount?.toString() ||
                      tempRoomData?.roomCount?.toString() === '0'
                    }
                    onPress={() => editRoomCount()}
                    style={
                      !tempRoomData?.roomCount?.toString() ||
                      tempRoomData?.roomCount?.toString() === '0'
                        ? styles.modalbtnUnfocused
                        : styles.modalbtnFocus
                    }>
                    <Text
                      style={
                        !tempRoomData?.roomCount?.toString() ||
                        tempRoomData?.roomCount?.toString() === '0'
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

        <Modal // delete room modal
          transparent
          visible={deleteModal}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setDeleteModal(false);
            }}
            style={styles.modalContainer}>
            <Pressable>
              <View style={styles.mainContainer}>
                <Text style={styles.roomCountTxt}>
                  Are you sure you want to delete room ?
                </Text>

                <View style={styles.modalBtnContainer}>
                  <TouchableOpacity // cancel button
                    onPress={() => {
                      setDeleteModal(false);
                    }}
                    style={roomCountTxt && styles.modalbtnUnfocused}>
                    <Text
                      style={
                        roomCountTxt
                          ? styles.modalTxtUnfocused
                          : styles.modalTxtFocus
                      }>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity // OK button
                    onPress={() => deleteRoom()}
                    style={
                      !tempRoomData?.roomCount?.toString() ||
                      tempRoomData?.roomCount?.toString() === '0'
                        ? styles.modalbtnUnfocused
                        : styles.modalbtnFocus
                    }>
                    <Text
                      style={
                        !tempRoomData?.roomCount?.toString() ||
                        tempRoomData?.roomCount?.toString() === '0'
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
    </KeyboardAvoidingView>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  roomList: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: normalize(20),
    paddingHorizontal: normalize(22),
    paddingBottom: height * 0.3,
  },
  roomTxt: {
    fontSize: normalize(14),
    fontWeight: '600',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_WHITE,
  },
  rooms: {
    backgroundColor: colors.COLOR_WHITE,
    height: height * 0.18,
    width: width * 0.4,
    marginBottom: normalize(27),
    borderRadius: normalize(20),
    // justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: normalize(12),
  },
  roomInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statusContainer: {
    marginTop: normalize(28),
  },
  downArrow: {
    resizeMode: 'contain',
    height: normalize(12),
    width: normalize(12),
    transform: [{rotate: '90deg'}],
    marginTop: normalize(2),
    marginLeft: normalize(12),
  },
  statusText: {
    fontWeight: '500',
    fontSize: normalize(11.5),
    color: colors.COLOR_WHITE,
    fontFamily: fonts.INTER_MEDIUM,
  },
  backIconContainer: {
    // paddingVertical: normalize(12),
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    height: height * 0.2,
    width: width * 0.85,
    backgroundColor: '#ffffff',
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent : 'center',
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
    marginTop: normalize(22),
    width: '100%',
    paddingHorizontal: normalize(15),
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
  del: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: normalize(20),
    height: normalize(20),
    top: normalize(40),
    left: normalize(80),
  },
  delIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    marginBottom : verticalScale(10)
  },
});
