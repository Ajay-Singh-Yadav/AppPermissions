import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const SearchBar = () => {
  return (
    <View>
      <View>
        <Text>SearchBar</Text>
        <TextInput placeholder="Search" />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
