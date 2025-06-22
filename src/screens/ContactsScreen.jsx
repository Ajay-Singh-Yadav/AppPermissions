import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Contacts from 'react-native-contacts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {getColorFromName} from '../utils/colors';

const ContactsScreen = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);

  const [searchContact, setSearchContact] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  // Request contact permission
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

  const handleSearch = text => {
    if (!text) {
      setFilteredContacts(contacts); // Reset if search is cleared
      return;
    }

    const filtered = contacts.filter(contact =>
      (contact.displayName || '').toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredContacts(filtered);
  };

  // Load contacts
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
      .then(contactList => {
        const AtoZContacts = [];
        const restContacts = [];

        contactList.forEach(contact => {
          const name = contact.displayName || '';
          const firstChar = name[0]?.toUpperCase();

          if (firstChar >= 'A' && firstChar <= 'Z') {
            AtoZContacts.push(contact);
          } else {
            restContacts.push(contact);
          }
        });

        // Sort both groups
        const sortedAtoZ = AtoZContacts.sort((a, b) =>
          a.displayName.localeCompare(b.displayName),
        );

        const sortedRest = restContacts.sort((a, b) =>
          (a.displayName || '').localeCompare(b.displayName || ''),
        );

        // Combine both
        const finalContacts = [...sortedAtoZ, ...sortedRest];

        setContacts(finalContacts);

        setFilteredContacts(finalContacts);
      })
      .catch(err => console.warn(err));
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const renderContact = ({item, index}) => {
    const name = item.displayName || 'Unnamed';
    const firstLetter = name.charAt(0).toUpperCase();
    const circleColor = getColorFromName(name);
    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => navigation.navigate('Profile', {contact: item})}>
        <View style={styles.contactContainer}>
          <View style={[styles.avatarCircle, {backgroundColor: circleColor}]}>
            <Text style={styles.avatarLetter}>{firstLetter}</Text>
          </View>

          <Text style={styles.contactText}>
            {' '}
            {item.displayName || 'Unnamed'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <FlatList
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <View style={styles.searchAndIcon}>
              <Feather
                name="search"
                size={20}
                color="#fff"
                style={styles.leftIcon}
              />
              <TextInput
                placeholder="Search contacts"
                placeholderTextColor="#ccc"
                style={styles.searchInput}
                value={searchContact}
                onChangeText={text => {
                  setSearchContact(text);
                  handleSearch(text);
                }}
              />
            </View>
            <Image
              source={require('../assets/images/userIcon.png')}
              style={styles.userIcon}
            />
          </View>
        }
        data={filteredContacts}
        keyExtractor={item => item.recordID}
        renderItem={renderContact}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1417',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 16,
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: '#1B272F',
  },
  searchAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#1B272F',
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 45,
  },
  leftIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  userIcon: {
    width: 35,
    height: 35,
    marginLeft: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 50,
    backgroundColor: '#0F1417',
  },
  contactItem: {
    padding: 16,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarLetter: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
