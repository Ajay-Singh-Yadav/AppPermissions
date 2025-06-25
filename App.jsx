import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import MainTabs from './src/Navigation/MainTabs';
import ProfileScreen from './src/screens/ProfileScreen';
import CameraScreen from './src/screens/CameraScreen';
import PdfViewer from './src/screens/PdfViewer';
import LocationScreen from './src/screens/LocationScreen';
import PDFReaderScreen from './src/screens/PDFReaderScreen';
import DOCViewer from './src/screens/DOCViewer';
import SplashScreen from './src/screens/SpalshScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTab" component={MainTabs} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="PDFViewer" component={PdfViewer} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="PDFReader" component={PDFReaderScreen} />
        <Stack.Screen name="DOCReader" component={DOCViewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
