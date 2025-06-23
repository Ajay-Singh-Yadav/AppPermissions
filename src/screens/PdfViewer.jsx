import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = ({route}) => {
  const {uri} = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{uri}}
        style={styles.pdf}
        onError={error => {
          console.log('PDF loading error:', error);
        }}
      />
    </View>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
