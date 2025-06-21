import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  SectionList,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {useNavigation} from '@react-navigation/native';

const ContactListScreen = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);

  // Ask for permission
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

  // Load and group contacts
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
        const sorted = contactList.sort((a, b) =>
          (a.displayName || '').localeCompare(b.displayName || ''),
        );

        // Group contacts by first letter
        const grouped = {};
        sorted.forEach(contact => {
          const name = contact.displayName || 'Unnamed';
          const firstLetter = name[0]?.toUpperCase() || '#';
          if (!grouped[firstLetter]) {
            grouped[firstLetter] = [];
          }
          grouped[firstLetter].push(contact);
        });

        const sections = Object.keys(grouped)
          .sort()
          .map(letter => ({
            title: letter,
            data: grouped[letter] || [],
          }));

        setContacts(sections);
      })
      .catch(err => console.warn(err));
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const renderContact = ({item}) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('Profile', {contact: item})}>
      <Text style={styles.contactText}>{item.displayName || 'Unnamed'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={contacts}
        keyExtractor={(item, index) => item.recordID + index}
        renderItem={renderContact}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contactItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
  sectionHeader: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactListScreen;
