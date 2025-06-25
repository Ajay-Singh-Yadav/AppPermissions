import React, {useState} from 'react';
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
  city,
  region,
  fullAddress,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Location Sharing</Text>
          <Text style={styles.subtitle}>
            Share your real-time location with{' '}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <Image
              source={{
                uri:
                  contact?.profileImage ||
                  'https://cdn-icons-png.flaticon.com/512/706/706830.png',
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>
                {contact?.displayName || 'Unnamed'}
              </Text>
              <Text style={styles.phone}>
                {contact?.phoneNumbers?.[0]?.number || 'No Number'}
              </Text>
            </View>
          </View>

          <Text style={[styles.city, {fontWeight: '600'}]}>
            City:{' '}
            <Text style={[styles.city, {fontWeight: '400', color: '#444'}]}>
              {city || 'N/A'}
            </Text>
          </Text>
          <Text style={[styles.region, {fontWeight: '600'}]}>
            Region:{' '}
            <Text style={[styles.region, {fontWeight: '400', color: '#444'}]}>
              {region || 'N/A'}
            </Text>
          </Text>

          <Text style={[styles.addressText, {fontSize: 15, fontWeight: '600'}]}>
            Location:{' '}
            <Text
              style={[styles.addressText, {color: '#0070C4', fontSize: 12}]}>
              {fullAddress || 'Fetching address...'}
            </Text>
          </Text>

          <Text style={[styles.coords, {fontWeight: '600'}]}>
            Latitude:{' '}
            <Text style={[styles.coords, {fontWeight: '400'}]}>{latitude}</Text>
          </Text>
          <Text style={[styles.coords, {fontWeight: '600'}]}>
            Longitude:{' '}
            <Text style={[styles.coords, {fontWeight: '400'}]}>
              {longitude}
            </Text>
          </Text>

          <Text style={styles.coords}></Text>

          <View
            style={{flexDirection: 'row', justifyContent: 'flex-end', gap: 30}}>
            <TouchableOpacity onPress={onClose} style={{marginTop: 20}}>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareLocation}>
              <Text style={styles.share}>Share</Text>
            </TouchableOpacity>
          </View>
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
  },
  addressText: {
    marginTop: 2,
    color: '#444',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  shareLocation: {
    marginTop: 20,
  },
  share: {
    color: '#0070C4',
    fontSize: 18,
  },
  close: {
    color: '#0070C4',
    fontSize: 18,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 10,
    marginLeft: 20,
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
    color: '#444',
  },
  region: {
    fontSize: 15,
    color: '#444',
  },
  coords: {
    fontSize: 14,
    color: '#444',
  },
});

export default LocationSharingModal;
