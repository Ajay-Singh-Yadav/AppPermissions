// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Switch,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   FlatList,
//   Alert,
//   StatusBar,
//   TextInput,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Feather from 'react-native-vector-icons/Feather';

// import Contacts from 'react-native-contacts';
// import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {useNavigation} from '@react-navigation/native';

// const ContactsScreen = () => {
//   const navigation = useNavigation();

//   const [contacts, setContacts] = useState([]);

//   const toggleSwitch = () =>

//     setIsFaceIdEnabled(previousState => !previousState);

//   // Contact Permission
//   const requestContactPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//         {
//           title: 'Contacts Permission',
//           message: 'App needs access to your contacts.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   const loadContacts = async () => {
//     const permission = await requestContactPermission();
//     if (!permission) {
//       Alert.alert(
//         'Permission Denied',
//         'Please enable contact permission from settings.',
//       );
//       return;
//     }

//     Contacts.getAll()
//       .then(contacts => {
//         const sortedContacts = contacts.sort((a, b) =>
//           (a.displayName || '').localeCompare(b.displayName || ''),
//         );
//         setContacts(sortedContacts);
//       })
//       .catch(err => console.warn(err));
//   };

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   const renderContact = ({item, index}) => (
//     <TouchableOpacity
//       style={styles.contactItem}
//       onPress={() => navigation.navigate('Profile', {contact: item})}>
//       <Text style={styles.contactText}>
//         {index + 1}. {item.displayName || 'Unnamed'}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#111117'}}>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="light-content" // Light icons on dark background
//       />
//       <FlatList
//         ListHeaderComponent={
//           <View style={styles.searchContainer}>
//             <View style={styles.searchAndIcon}>
//               <Feather
//                 name="search"
//                 size={20}
//                 color="#fff"
//                 style={styles.leftIcon}
//               />
//               <TextInput
//                 placeholder="Search contacts"
//                 placeholderTextColor="#ccc"
//                 style={styles.searchInput}
//               />
//             </View>
//             <Image
//               source={require('../assets/images/userIcon.png')}
//               style={styles.userIcon}
//             />
//           </View>
//         }
//         data={contacts}
//         keyExtractor={item => item.recordID}
//         renderItem={renderContact}
//         contentContainerStyle={styles.contentContainer}
//       />
//     </SafeAreaView>
//   );
// };

// export default ContactsScreen;

// const styles = StyleSheet.create({
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginTop: 16,
//     borderRadius: 30,
//     paddingHorizontal: 10,
//     backgroundColor: '#111117',
//   },
//   searchAndIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     backgroundColor: '#222',
//     borderRadius: 25,
//     paddingHorizontal: 12,
//     height: 45,
//   },
//   leftIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 16,
//   },
//   userIcon: {
//     width: 35,
//     height: 35,
//     marginLeft: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#fff', // optional white border for visibility
//   },
//   contentContainer: {
//     paddingBottom: 50,
//     // ensures FlatList background is black too
//   },
//   contactItem: {
//     padding: 16,
//     backgroundColor: '#111117',
//   },
//   contactText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

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

const ContactsScreen = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);

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
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('Profile', {contact: item})}>
      <Text style={styles.contactText}>
        {index + 1}. {item.displayName || 'Unnamed'}
      </Text>
    </TouchableOpacity>
  );

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
              />
            </View>
            <Image
              source={require('../assets/images/userIcon.png')}
              style={styles.userIcon}
            />
          </View>
        }
        data={contacts}
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
    backgroundColor: '#1B272F',
  },
  contactItem: {
    padding: 16,
    backgroundColor: '#',
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
  },
});
