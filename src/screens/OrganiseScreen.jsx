import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {documentTypes} from '../utils/documentTypes';

import Header from '../components/Header';
import DocumentReader from '../components/DocumentReader';
import {useNavigation} from '@react-navigation/native';

const OrganiseScreen = () => {
  const navigation = useNavigation();

  const DocumentsScreens = typeLabel => {
    if (typeLabel === 'PDF') {
      navigation.navigate('PDFViewer');
    }
    if (typeLabel === 'DOC') {
      navigation.navigate('DOCReader');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView>
        <Header />

        {/* Cloud Storage */}
        <View style={styles.cloudContainer}>
          <Text style={styles.cloudTitle}>Online Cloud Storage</Text>
          <Text style={styles.cloudSubTitle}>Upgrade Now.</Text>
          <View style={styles.cloudButtons}>
            <TouchableOpacity style={styles.cloudBtn}>
              <Text style={styles.cloudBtnText}>Cloud Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cloudBtn}>
              <Text style={styles.cloudBtnText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Document Reader */}
        <Text style={styles.sectionTitle}>Document Reader</Text>

        {/* <DocumentReader />  */}

        <View style={styles.grid}>
          {documentTypes.map((doc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              onPress={() => DocumentsScreens(doc.label)}>
              <Icon name={doc.icon} size={30} color={doc.color} />
              <Text style={styles.docLabel}>{doc.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Document Tools */}

        <Text style={styles.sectionTitle}>Document Tools</Text>
        <View style={{marginVertical: 20}}>
          <DocumentReader />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0F1417'},
  cloudContainer: {
    backgroundColor: '#d8b4fe',
    margin: 12,
    padding: 16,
    borderRadius: 12,
  },
  cloudTitle: {fontSize: 18, fontWeight: 'bold', color: '#1e1e1e'},
  cloudSubTitle: {fontSize: 14, marginTop: 4, color: '#555'},
  cloudButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cloudBtn: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cloudBtnText: {fontWeight: '500', color: '#000'},
  sectionTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginTop: 16,
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 12,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%',
    marginVertical: 10,
    alignItems: 'center',
  },
  docLabel: {marginTop: 4, fontSize: 12, color: '#fff'},
  docSize: {fontSize: 11, color: '#555'},
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 12,
    justifyContent: 'space-between',
  },
  toolItem: {
    width: '30%',
    marginVertical: 12,
    alignItems: 'center',
  },
  toolLabel: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});

export default OrganiseScreen;
