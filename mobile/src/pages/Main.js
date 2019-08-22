import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import logo from '../assets/logo.png';

export default function Main() {
  return (
    <View style={styles.container}>
      <Image source={logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
