import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {documentTypes} from '../utils/documentTypes';
import {pick, types} from '@react-native-documents/picker';

import RNFS from 'react-native-fs';

import Header from '../components/Header';
import DocumentReader from '../components/DocumentReader';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrganiseScreen = () => {
  const navigation = useNavigation();

  const [pickedPDF, setPickedPDF] = useState(null);

  const DocumentsScreens = typeLabel => {
    if (typeLabel === 'PDF') {
      navigation.navigate('PDFViewer');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
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
              <Text style={styles.docLabel}>
                {doc.label}({doc.count})
              </Text>
              <Text style={styles.docSize}>{doc.size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Document Tools */}

        <Text style={styles.sectionTitle}>Document Tools</Text>
        <View style={{marginVertical: 20}}>
          <DocumentReader />
        </View>

        <Text>Pdf's files</Text>

        {/* {pickedPDF && (
          <View
            style={{
              marginHorizontal: 12,
              marginTop: -8,
              padding: 10,
              backgroundColor: '#f9fafb',
              borderRadius: 8,
              borderColor: '#d1d5db',
              borderWidth: 1,
            }}>
            <Text style={{fontWeight: 'bold', marginBottom: 4}}>
              📄 Selected DOC PDF:
            </Text>
            <Text style={{color: '#374151'}}>{pickedPDF.name}</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PDFViewer', {localPath: pickedPDF.uri});
              }}
              style={{
                marginTop: 6,
                padding: 6,
                backgroundColor: '#e0f2fe',
                borderRadius: 6,
                alignSelf: 'flex-start',
              }}>
              <Text style={{color: '#0369a1'}}>Open PDF</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
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
    color: '#111827',
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
  docLabel: {marginTop: 4, fontSize: 12, color: '#111'},
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
    color: '#111827',
  },
});

export default OrganiseScreen;
