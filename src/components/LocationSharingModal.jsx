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

          <Text style={styles.city}>Location: Amritsar </Text>
          <Text style={styles.coords}>Latitude: {latitude}</Text>
          <Text style={styles.coords}>Longitude: {longitude}</Text>

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
    color: '#000',
  },
  coords: {
    fontSize: 14,
    color: '#444',
  },
});

export default LocationSharingModal;
