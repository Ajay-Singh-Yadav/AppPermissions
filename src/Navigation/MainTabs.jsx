import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ContactsScreen from '../screens/ContactsScreen';
import HighlightsScreen from '../screens/HighlightsScreen';
import OrganiseScreen from '../screens/OrganiseScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: 'white', // Inactive icon + label color
        tabBarStyle: {
          backgroundColor: '#1C2024',
          height: 80,
        },
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Contacts') {
            return <FontAwesome name="user" size={size} color={color} />;
          } else if (route.name === 'Highlights') {
            return <AntDesign name="star" size={size} color={color} />;
          } else if (route.name === 'Organise') {
            return (
              <Fontisto name="nav-icon-list-a" size={size} color={color} />
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
