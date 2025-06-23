import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

const PdfViewer = ({route}) => {
  const {localPath} = route.params;

  const uri = Platform.OS === 'android' ? `file://${localPath}` : localPath;

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(
            uri,
          )}`,
        }}
        startInLoadingState
      />
    </View>
  );
};

export default PdfViewer;
