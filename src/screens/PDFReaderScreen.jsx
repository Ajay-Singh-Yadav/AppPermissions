// screens/PDFReaderScreen.js

import React from 'react';
import {View, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const PDFReaderScreen = () => {
  const {params} = useRoute();
  const {uri} = params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Pdf
        source={{uri}}
        style={styles.pdf}
        onError={error => console.log('PDF load error:', error)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default PDFReaderScreen;
