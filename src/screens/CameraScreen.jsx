import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Button,
  PermissionsAndroid,
  Platform,
  Linking,
  TouchableOpacity,
} from 'react-native';

import {Camera, useCameraDevice} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute, useNavigation} from '@react-navigation/native';

import {pick, types} from '@react-native-documents/picker';

const CameraScreen = () => {
  const route = useRoute();

  const navigation = useNavigation();
  const cameraRef = useRef(null);

  const [hasPermission, setHasPermission] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraType, setCameraType] = useState('back');

  const device = useCameraDevice(cameraType);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();

      if (cameraPermission === 'denied') {
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera access from settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
        return;
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Storage permission denied');
        }
      }

      setHasPermission(true);
      setCameraActive(true);
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto();
        const photoUri = 'file://' + photo.path;

        if (route.params?.onCapture) {
          route.params.onCapture(photoUri);
        }
        navigation.goBack();
      } catch (error) {
        console.error('Capture failed:', error);
      }
    }
  };

  const flipCamera = () => {
    setCameraType(prev => (prev === 'back' ? 'front' : 'back'));
  };

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Loading camera device...</Text>
      </View>
    );
  }

  const pickImageFromGallery = async () => {
    try {
      const [file] = await pick({
        type: [types.images],
      });

      if (file) {
        const selectedImageUri = file.uri;

        if (route.params?.onCapture) {
          route.params.onCapture(selectedImageUri);
        }

        navigation.goBack();
      }
    } catch (err) {
      if (err.code !== 'DOCUMENT_PICKER_CANCELED') {
        Alert.alert('Error', 'Unable to pick image');
        console.error(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={cameraActive}
        photo={true}
      />

      <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
        <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={takePhoto} style={styles.outerRing}>
        <View style={styles.innerCircle}>
          <Ionicons name="camera" size={28} color="#fff" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.galleryButton}
        onPress={pickImageFromGallery}>
        <Ionicons name="images-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  outerRing: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#fff', // Ring color
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.82)', // Inner background
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    position: 'absolute',
    bottom: 40,
    left: 30,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 50,
  },

  flipButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 50,
  },
});
