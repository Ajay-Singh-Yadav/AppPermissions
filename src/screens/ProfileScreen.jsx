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
  ScrollView,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyD3FbslZFCti8Gub5tSiw2WnqSvkRR2Jq8');

import Share from 'react-native-share';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactSettings from '../components/ContactSettings';

import LocationSharingModal from '../components/LocationSharingModal';

const ProfileScreen = () => {
  const imageSize = 200;
  const navigation = useNavigation();
  const route = useRoute();
  const {contact} = route.params;

  const [location, setLocation] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');

  const [fullAddress, setFullAddress] = useState('');

  const handleImageCapture = async uri => {
    setProfileImage(uri);
    await AsyncStorage.setItem(`profileImage_${contact.recordID}`, uri);
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    const loadProfileImage = async () => {
      const uri = await AsyncStorage.getItem(
        `profileImage_${contact.recordID}`,
      );
      if (uri) {
        setProfileImage(uri);
      }
    };
    loadProfileImage();
  }, [contact.recordID]);

  const shareContact = async () => {
    const name = contact.displayName || 'Unnamed';
    const number =
      contact.phoneNumbers?.length > 0
        ? contact.phoneNumbers[0].number
        : 'No Number';

    try {
      const res = await Share.open({
        message: `Contact Info:\nName: ${name}\nPhone: ${number}`,
      });
    } catch (error) {
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'Failed to share contact');
      }
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        try {
          const geoResponse = await Geocoder.from(latitude, longitude);
          const formatted = geoResponse.results[0].formatted_address;
          setFullAddress(formatted);
          const addressComponents = geoResponse.results[0].address_components;
          let cityName = '';
          let regionName = '';

          addressComponents.forEach(component => {
            if (component.types.includes('locality')) {
              cityName = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
              regionName = component.long_name;
            }
          });

          setCity(cityName);
          setRegion(regionName);
          setShowLocationModal(true);
        } catch (error) {
          console.error('Geocoding Error:', error);
          Alert.alert('Geocoding Failed', 'Unable to fetch address.');
        }
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
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        {/* Top Icons */}
        <View style={styles.container}>
          <View style={styles.TopIconsContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri:
                    profileImage ||
                    'https://cdn-icons-png.flaticon.com/512/706/706830.png',
                }}
                style={[styles.avatar, {borderRadius: imageSize / 2}]}
              />

              {/* Camera icon overlay */}
              <TouchableOpacity
                style={styles.cameraIconButton}
                onPress={() =>
                  navigation.navigate('Camera', {
                    onCapture: handleImageCapture,
                  })
                }>
                <Feather name="camera" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {contact.displayName || 'Unnamed'}
              </Text>
            </View>
          </View>

          {/* Call Section */}

          <View style={styles.callSection}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.callIconContainer}>
                <TouchableOpacity style={styles.callSectionIcon}>
                  <Ionicons name="call-outline" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={{alignSelf: 'center', color: '#fff', fontSize: 12}}>
                Call
              </Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.callIconContainer}>
                <TouchableOpacity>
                  <Feather name="message-circle" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={{alignSelf: 'center', color: '#fff', fontSize: 12}}>
                Message
              </Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.callIconContainer}>
                <TouchableOpacity>
                  <MaterialIcons name="videocam" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={{alignSelf: 'center', color: '#fff', fontSize: 12}}>
                Video
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                style={styles.callIconContainer}
                onPress={getLocation}>
                {/* <TouchableOpacity onPress={getLocation}> */}
                <Feather name="map-pin" size={22} color="#fff" />
                {/* </TouchableOpacity> */}
              </TouchableOpacity>
              <Text style={{alignSelf: 'center', color: '#fff', fontSize: 12}}>
                {'  '}
                share{'\n'}Location
              </Text>
            </View>
          </View>

          {/* Cards */}
          <View style={styles.card}>
            <Text style={styles.title}>Contact info</Text>
            <View style={styles.rowBetween}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
                <Ionicons name="call-outline" size={22} color="#fff" />
                <View>
                  <Text style={styles.phone}>
                    {' '}
                    {contact.phoneNumbers?.length > 0
                      ? contact.phoneNumbers[0].number
                      : 'No Number'}
                  </Text>
                  <Text style={styles.label}>Mobile</Text>
                </View>
              </View>
              <View style={styles.iconRow}>
                <TouchableOpacity>
                  <Icon name="videocam-outline" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconSpace}>
                  <Icon
                    name="chatbubble-ellipses-outline"
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.card}>
            <Text style={styles.title}>Recent activity</Text>
            <Text style={styles.subText}>
              To view calls and messages from your contacts,{' '}
              <Text style={styles.link} onPress={() => Linking.openURL('#')}>
                allow this app to access that info
              </Text>
            </Text>
          </View>

          {/* Connected Apps */}
          <View style={styles.card}>
            <Text style={styles.title}>Connected apps</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.row}>
                <FontAwesome name="whatsapp" size={24} color="#25D366" />
                <Text style={styles.whatsappText}>WhatsApp</Text>
              </View>
              <Entypo name="chevron-small-down" size={24} color="#fff" />
            </View>
          </View>

          <View
            style={{
              height: 0.5,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              marginVertical: 8,
            }}
          />

          <ContactSettings onPress={shareContact} />

          {/* End Main Container */}
        </View>
      </ScrollView>

      <LocationSharingModal
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        contact={{...contact, profileImage}}
        latitude={latitude}
        longitude={longitude}
        city={city}
        region={region}
        fullAddress={fullAddress}
      />
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

  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
    marginTop: 50,
  },
  username: {
    color: '#fff',
    fontSize: 15,
  },
  callSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  callIconContainer: {
    backgroundColor: '#374955',
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  callSectionIcon: {
    borderRadius: 30,
    backgroundColor: '',
    padding: 15,
  },
  avatarContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: 10,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  cameraIconButton: {
    position: 'absolute',
    bottom: -40,
    right: -30,
    backgroundColor: 'gray',
    borderRadius: 12,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#181C1F',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 30,
  },
  phone: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
    marginLeft: 10,
  },
  subText: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 18,
  },
  link: {
    color: '#4d9be8',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpace: {
    marginLeft: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 20,
  },
});

export default ProfileScreen;
