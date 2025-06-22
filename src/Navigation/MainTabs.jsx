import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ContactsScreen from '../screens/ContactsScreen';
import HighlightsScreen from '../screens/HighlightsScreen';
import OrganiseScreen from '../screens/OrganiseScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 12, marginTop: 10},
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#1C2024',
          height: 80,
          borderTopWidth: 0,
          elevation: 5,
          shadowOpacity: 0,
        },
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Contacts') {
            return (
              <Ionicons
                name="person"
                size={20}
                color={color}
                style={{marginTop: 10}}
              />
            );
          } else if (route.name === 'Highlights') {
            return (
              <MaterialIcons
                name="star-border"
                size={22}
                color={color}
                style={{marginTop: 10}}
              />
            );
          } else if (route.name === 'Organise') {
            return (
              <Feather
                name="bookmark"
                size={20}
                color={color}
                style={{marginTop: 10}}
              />
            );
          }
        },
      })}>
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Highlights" component={HighlightsScreen} />
      <Tab.Screen name="Organise" component={OrganiseScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
