import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ContactsScreen from '../screens/ContactsScreen';
import HighlightsScreen from '../screens/HighlightsScreen';
import OrganiseScreen from '../screens/OrganiseScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Highlights" component={HighlightsScreen} />
      <Tab.Screen name="Organise" component={OrganiseScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
