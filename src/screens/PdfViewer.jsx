import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {SafeAreaView} from 'react-native-safe-area-context';

const PdfViewer = ({route}) => {
  const {localPath} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Pdf
        source={{uri: `file://${localPath}`}}
        style={styles.pdf}
        onError={error => {
          console.log('PDF load error:', error);
        }}
      />
    </SafeAreaView>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
