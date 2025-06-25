import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Feather from 'react-native-vector-icons/Feather';
import {recents} from '../utils/documentTypes';
import {favourites} from '../utils/documentTypes';

const ContactsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
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

      <Text style={styles.title}>Favourites</Text>
      <ScrollView
        style={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {favourites.map(item => (
          <TouchableOpacity key={item.id} style={styles.avatarContainer}>
            <View style={[styles.avatar, {backgroundColor: item.color}]}>
              <Text style={styles.avatarText}>{item.initial}</Text>
            </View>
            <Text style={styles.avatarName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.title}>Recents</Text>
      <View
        style={{
          backgroundColor: '#181C1F',
          padding: 15,
          marginTop: 10,
          borderRadius: 20,
        }}>
        {recents.map(item => (
          <TouchableOpacity key={item.id} style={styles.recentItem}>
            <View style={[styles.recentIcon, {backgroundColor: item.color}]}>
              <Text style={styles.recentText}>{item.initial}</Text>
            </View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#0F1417',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 30,
    paddingHorizontal: 16,
    marginBottom: 16,
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
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
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

    borderColor: '#fff',
  },
  avatarContainer: {
    borderColor: '#333',
    borderRadius: 60,
    padding: 8,
    marginRight: 16,
    alignItems: 'center',
  },
  scrollContainer: {
    maxHeight: 130, // instead of fixed 80
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {color: '#000', fontSize: 20, fontWeight: 'bold'},
  avatarName: {color: '#fff', marginTop: 4, fontSize: 12, textAlign: 'center'},
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  recentText: {color: '#000', fontWeight: 'bold'},
  name: {color: '#fff', fontSize: 16},
  time: {color: '#aaa', fontSize: 12},
});

export default ContactsScreen;
