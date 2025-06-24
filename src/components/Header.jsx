import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Hamburger Menu */}
      <TouchableOpacity>
        <Feather name="menu" size={24} color="white" />
      </TouchableOpacity>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity>
          <Entypo name="block" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="help-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="time-outline" size={24} color="#32c4c0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.crownWrapper}>
          <FontAwesome name="crown" size={22} color="orange" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // works only in modern React Native; use marginRight as fallback if needed
  },
  crownWrapper: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
});
