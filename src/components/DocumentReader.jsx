import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DocumentReader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.IconContainer}>
        <Icon name="file-plus-outline" size={30} color={'#4A90E2'} />
        <Text style={styles.docLabel}>Create PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.IconContainer}>
        <Icon
          name="file-document-multiple-outline"
          size={30}
          color={'#4A90E2'}
        />
        <Text style={styles.docLabel}>Merge PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.IconContainer}>
        <Icon name="scanner" size={30} color={'#4A90E2'} />
        <Text style={styles.docLabel}>Scan PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocumentReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    marginLeft: 0,
    paddingVertical: 10,
  },
  IconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  docLabel: {marginTop: 4, fontSize: 12, color: '#111'},
  toolLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#111827',
  },
  docSize: {fontSize: 11, color: '#555'},
});
