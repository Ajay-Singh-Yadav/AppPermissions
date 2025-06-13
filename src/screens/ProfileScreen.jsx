import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const ProfileScreen = () => {
  const [isFaceIdEnabled, setIsFaceIdEnabled] = React.useState(false);
  const [location, setLocation] = useState(null);

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

  const toggleSwitch = () =>
    setIsFaceIdEnabled(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
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

      {/* Settings Options */}
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
              <Text style={styles.sub}>
                Further secure your account for safety
              </Text>
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
            <Text style={styles.locationText}>Location not fetched yet.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    marginTop: 80,
  },
  header: {
    backgroundColor: '#1E2EFF',
    padding: 20,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    color: '#fff',
    fontSize: 14,
  },
  editIcon: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 14,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  leftRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  sub: {
    fontSize: 13,
    color: '#666',
  },
  locationContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  locationText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});
