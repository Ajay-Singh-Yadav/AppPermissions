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
  StatusBar,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import Contacts from 'react-native-contacts';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';

const ContactsScreen = () => {
  const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content" // or 'light-content' based on your UI
      />
      <FlatList
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={20}
              color="#000"
              style={styles.leftIcon}
            />
            <TextInput
              placeholder="Search contacts"
              placeholderTextColor="#000"
            />
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
    </SafeAreaView>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  leftIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#000',
  },
});
