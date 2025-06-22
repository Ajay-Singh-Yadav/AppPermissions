import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const ContactSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact settings</Text>

      {/* Contact Ringtone */}
      <View style={styles.row}>
        <Icon name="music-note" size={24} color="#fff" style={styles.icon} />
        <View>
          <Text style={styles.title}>Contact ringtone</Text>
          <Text style={styles.subtitle}>
            Default (YUNG DSA - YEDA YUNG Instrumental Ringtone | Viral
            Instagram Ringtone | New Ringtone 2025 | Melody BGM)
          </Text>
        </View>
      </View>

      {/* Reminders */}
      <TouchableOpacity style={styles.row}>
        <Feather name="clipboard" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.title}>Reminders</Text>
      </TouchableOpacity>

      {/* Share Contact */}
      <TouchableOpacity style={styles.row}>
        <Feather name="share-2" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.title}>Share contact</Text>
      </TouchableOpacity>

      {/* Add to Home Screen */}
      <TouchableOpacity style={styles.row}>
        <Entypo name="grid" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.title}>Add to home screen</Text>
      </TouchableOpacity>

      {/* Move to another account */}
      <TouchableOpacity style={styles.row}>
        <Ionicons
          name="log-out-outline"
          size={24}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.title}>Move to another account</Text>
      </TouchableOpacity>

      {/* Send to voicemail */}
      <View style={styles.row}>
        <Ionicons name="voicemail" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.title}>Send to voicemail</Text>
        <Switch value={false} style={{marginLeft: 'auto'}} />
      </View>

      {/* Block numbers */}
      <TouchableOpacity style={styles.row}>
        <Ionicons name="ban" size={24} color="#ff6b6b" style={styles.icon} />
        <Text style={[styles.title, {color: '#ff6b6b'}]}>Block numbers</Text>
      </TouchableOpacity>

      {/* Delete */}
      <TouchableOpacity style={styles.row}>
        <Ionicons
          name="trash-bin"
          size={24}
          color="#ff6b6b"
          style={styles.icon}
        />
        <Text style={[styles.title, {color: '#ff6b6b'}]}>Delete</Text>
      </TouchableOpacity>

      {/* Linked contact info */}
      <View style={styles.linkedContainer}>
        <Ionicons name="link" size={16} color="#0f0" />
        <Text style={styles.linkedText}> Contact info from </Text>
        <Ionicons name="logo-whatsapp" size={16} color="#0f0" />
        <Text style={styles.linkedText}> 2 linked contacts</Text>
      </View>
    </View>
  );
};

export default ContactSettings;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: 12,
    backgroundColor: 'transparent',
  },
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  icon: {
    marginRight: 16,
    marginTop: 2,
  },
  title: {
    color: '#fff',
    fontSize: 15,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 13,
    paddingTop: 2,
    marginRight: 32,
  },
  linkedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  linkedText: {
    color: '#aaa',
    fontSize: 13,
  },
});
