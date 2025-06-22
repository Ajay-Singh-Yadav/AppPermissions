import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ContactInfoScreen = () => {
  const phoneNumber = '99582 25653';

  return (
    <SafeAreaView style={styles.container}>
      {/* Contact Info */}
      <View style={styles.card}>
        <Text style={styles.title}>Contact info</Text>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.phone}>{phoneNumber}</Text>
            <Text style={styles.label}>Mobile</Text>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity>
              <Icon name="videocam-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSpace}>
              <Icon name="chatbubble-ellipses-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.card}>
        <Text style={styles.title}>Recent activity</Text>
        <Text style={styles.subText}>
          To view calls and messages from your contacts,{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('#')}>
            allow this app to access that info
          </Text>
        </Text>
      </View>

      {/* Connected Apps */}
      <View style={styles.card}>
        <Text style={styles.title}>Connected apps</Text>
        <View style={styles.row}>
          <FontAwesome name="whatsapp" size={24} color="#25D366" />
          <Text style={styles.whatsappText}>WhatsApp</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  card: {
    backgroundColor: '#1c1c1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  phone: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  subText: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 18,
  },
  link: {
    color: '#4d9be8',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpace: {
    marginLeft: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 20,
  },
});
