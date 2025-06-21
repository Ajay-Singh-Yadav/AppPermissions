import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const route = useRoute();
  const {contact} = route.params;

  const [location, setLocation] = useState(null);

  // Location Permission
  const requestLocationPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      return result === RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLocation(position);
      },
      error => {
        console.warn(error.code, error.message);
        Alert.alert('Error', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Icons */}
      <View style={styles.container}>
        <View style={styles.TopIconsContainer}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.subTopIconsContainer}>
            <TouchableOpacity>
              <Feather name="edit-3" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="star-border" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/706/706830.png',
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{contact.displayName || 'Unnamed'}</Text>
            {/* <Text style={styles.username}>
              {' '}
              {contact.phoneNumbers && contact.phoneNumbers.length > 0
                ? contact.phoneNumbers[0].number
                : 'No Number'}
            </Text> */}
          </View>
        </View>

        {/* Call Section */}

        <View style={styles.callSection}>
          <TouchableOpacity style={styles.callSectionIcon}>
            <Ionicons name="call-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="message-circle" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="videocam" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="map-pin" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* End Main Container */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1417',
  },
  TopIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  subTopIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 35,
    fontWeight: '600',
    color: '#fff',
    marginTop: 30,
  },
  callSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  callSectionIcon: {
    borderRadius: 30,
    backgroundColor: '',
    padding: 15,
  },
});

export default ProfileScreen;

{
  /* <View style={styles.locationContainer}>
            <Button title="📍 Get Current Location" onPress={getLocation} />
            {location ? (
              <Text style={styles.locationText}>
                Latitude: {location.coords.latitude}
                {'\n'}
                Longitude: {location.coords.longitude}
              </Text>
            ) : (
              <Text style={styles.locationText}>Location not fetched yet.</Text>
            )}
          </View> */
}
