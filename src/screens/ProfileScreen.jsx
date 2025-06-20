import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Button,
  PermissionsAndroid,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import Contacts from 'react-native-contacts';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const ProfileScreen = () => {
  const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
  const [location, setLocation] = useState(null);

  const [contacts, setContacts] = useState([]);

  const toggleSwitch = () =>
    setIsFaceIdEnabled(previousState => !previousState);

  // Contact Permission
  const requestContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'App needs access to your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const loadContacts = async () => {
    const permission = await requestContactPermission();
    if (!permission) {
      Alert.alert(
        'Permission Denied',
        'Please enable contact permission from settings.',
      );
      return;
    }

    Contacts.getAll()
      .then(contacts => {
        const sortedContacts = contacts.sort((a, b) =>
          (a.displayName || '').localeCompare(b.displayName || ''),
        );
        setContacts(sortedContacts);
      })
      .catch(err => console.warn(err));
  };

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

  useEffect(() => {
    loadContacts();
  }, []);

  const renderContact = ({item, index}) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactText}>
        {index + 1}. {item.displayName || 'Unnamed'}
      </Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/706/706830.png',
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>Itunoluwa Abidoye</Text>
              <Text style={styles.username}>@Itunoluwa</Text>
            </View>
            <TouchableOpacity style={styles.editIcon}>
              <Feather name="edit-3" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.row}>
              <View style={styles.leftRow}>
                <Icon name="person-outline" size={24} color="#6B6B6B" />
                <View>
                  <Text style={styles.title}>My Account</Text>
                  <Text style={styles.sub}>Make changes to your account</Text>
                </View>
              </View>
              <MaterialIcons name="error-outline" size={20} color="red" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <View style={styles.leftRow}>
                <Icon name="person-outline" size={24} color="#6B6B6B" />
                <View>
                  <Text style={styles.title}>Saved Beneficiary</Text>
                  <Text style={styles.sub}>Manage your saved account</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#6B6B6B" />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={styles.leftRow}>
                <Icon name="lock-closed-outline" size={24} color="#6B6B6B" />
                <View>
                  <Text style={styles.title}>Face ID / Touch ID</Text>
                  <Text style={styles.sub}>Manage your device security</Text>
                </View>
              </View>
              <Switch
                value={isFaceIdEnabled}
                onValueChange={toggleSwitch}
                thumbColor={isFaceIdEnabled ? '#007bff' : '#ccc'}
              />
            </View>

            <TouchableOpacity style={styles.row}>
              <View style={styles.leftRow}>
                <Feather name="shield" size={24} color="#6B6B6B" />
                <View>
                  <Text style={styles.title}>Two-Factor Authentication</Text>
                  <Text style={styles.sub}>
                    Further secure your account for safety
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#6B6B6B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <View style={styles.leftRow}>
                <Feather name="log-out" size={24} color="#6B6B6B" />
                <View>
                  <Text style={styles.title}>Log out</Text>
                  <Text style={styles.sub}>Logout from your account</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#6B6B6B" />
            </TouchableOpacity>

            <View style={styles.locationContainer}>
              <Button title="📍 Get Current Location" onPress={getLocation} />
              {location ? (
                <Text style={styles.locationText}>
                  Latitude: {location.coords.latitude}
                  {'\n'}
                  Longitude: {location.coords.longitude}
                </Text>
              ) : (
                <Text style={styles.locationText}>
                  Location not fetched yet.
                </Text>
              )}
            </View>

            <Text style={styles.title}>Contacts</Text>
          </View>
        </View>
      }
      data={contacts}
      keyExtractor={item => item.recordID}
      renderItem={renderContact}
      ItemSeparatorComponent={() => (
        <View
          style={{height: 1, backgroundColor: '#ccc', marginHorizontal: 20}}
        />
      )}
      contentContainerStyle={{paddingBottom: 40}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  username: {
    color: '#888',
  },
  editIcon: {
    marginLeft: 'auto',
    backgroundColor: '#007bff',
    padding: 6,
    borderRadius: 20,
  },
  section: {
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sub: {
    color: '#777',
  },
  locationContainer: {
    marginTop: 15,
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#444',
  },
  contactItem: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 20,
    borderRadius: 6,
  },
  contactText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
