import {View, Text, PermissionsAndroid, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contact from 'react-native-contacts';
import {useIsFocused} from '@react-navigation/native';

const Contacts = () => {
  
  const [contactList, setContactList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getPermission();
  }, [isFocused]);

  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app needs access to your contacts.',
      buttonPositive: 'OK',
    }).then(res => {
      if (res === 'granted') {
        Contact.getAll()
          .then(con => {
            setContactList(con);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000', paddingTop: 20}}>
      <FlatList
        data={contactList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              padding: 15,
              borderBottomWidth: 0.5,
              borderColor: '#555',
            }}>
            <Text style={{color: '#fff', fontSize: 16}}>
              {item.displayName}
            </Text>
            <Text style={{color: '#aaa', fontSize: 14, marginTop: 5}}>
              {item.phoneNumbers[0]?.number || 'No Number'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Contacts;
