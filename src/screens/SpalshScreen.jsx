import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MainTab');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.splashImage}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1417',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  splashImage: {
    marginRight: 50,
    width: 200,
    height: 150,
  },
});
