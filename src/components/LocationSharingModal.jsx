// components/LocationSharingModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const LocationSharingModal = ({
  visible,
  onClose,
  contact,
  latitude,
  longitude,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Location Share</Text>
          <Image
            source={{
              uri:
                contact?.profileImage ||
                'https://cdn-icons-png.flaticon.com/512/706/706830.png',
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{contact?.displayName || 'Unnamed'}</Text>
          <Text style={styles.phone}>
            {contact?.phoneNumbers?.[0]?.number || 'No Number'}
          </Text>
          <Text style={styles.city}>City: Amritsar</Text>
          <Text style={styles.coords}>Latitude: {latitude}</Text>
          <Text style={styles.coords}>Longitude: {longitude}</Text>
          <TouchableOpacity onPress={onClose} style={{marginTop: 20}}>
            <Text style={{color: 'blue'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  phone: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  city: {
    fontSize: 15,
    marginTop: 10,
    color: '#666',
  },
  coords: {
    fontSize: 14,
    color: '#444',
  },
});

export default LocationSharingModal;
