import {
  View,
  Text,
  Animated,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../constants/colors';
import normalize from '../../utils/helpers/normalize';
const {width, height} = Dimensions.get('window');

export default function CustomModal({visible, children, dismiss, width}) {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={dismiss}
        style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            {transform: [{scale: scaleValue}], width},
          ]}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.COLOR_WHITE,
    // paddingHorizontal: 20,
    paddingVertical: normalize(10),
    borderRadius: 26,
    elevation: 20,
    borderColor: colors.BORDER_BLUE,
    borderWidth: 4,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
