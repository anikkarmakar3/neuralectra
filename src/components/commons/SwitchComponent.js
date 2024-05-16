import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  View,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';

const SwitchComponent = props => {
  const animValue = useRef(new Animated.Value(1)).current;
  const onState = () => {
    Animated.timing(animValue, {
      toValue: 42,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const offState = () => {
    Animated.timing(animValue, {
      toValue: 3,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (props.active === true) {
      onState();
    } else {
      offState();
    }
  }, [props.active]);

  return (
    <TouchableOpacity // container
      activeOpacity={1}
      onPress={() => props.onChange(!props.active)}
      style={styles.container}>
      <View
        style={[styles.round, props.active === false && styles.inactiveRnd]}>
        <Animated.View
          style={[
            styles.innerRound,
            props.active == false && styles.inactiveInnerRound,
            {transform: [{translateX: animValue}]},
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SwitchComponent;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  round: {
    height: normalize(23),
    width: normalize(55),
    backgroundColor: colors.BORDER_BLUE,
    borderRadius: normalize(32),
    display: 'flex',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  inactiveRnd: {
    height: normalize(23),
    width: normalize(58),
    backgroundColor: colors.RED,
    borderRadius: normalize(32),
    display: 'flex',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  innerRound: {
    height: normalize(19),
    width: normalize(19),
    borderRadius: normalize(32),
    backgroundColor: colors.COLOR_WHITE,
  },
  inactiveInnerRound: {
    backgroundColor: colors.COLOR_WHITE,
  },
});
