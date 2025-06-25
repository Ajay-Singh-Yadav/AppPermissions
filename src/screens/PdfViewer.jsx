import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {pick, types} from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const PDFViewerScreen = () => {
  const [pickedPDFs, setPickedPDFs] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const loadSavedPDFs = async () => {
      try {
        const saved = await AsyncStorage.getItem('saved_doc_pdfs');
        if (saved) {
          setPickedPDFs(JSON.parse(saved));
        }
      } catch (err) {
        console.error('Error loading saved PDFs:', err);
      }
    };
    loadSavedPDFs();
  }, []);

  const handleFilePick = async () => {
    try {
      const [file] = await pick({
        type: [types.pdf],
      });

      if (!file) {
        return;
      }

      if (file) {
        const destPath = `${RNFS.DocumentDirectoryPath}/${file.name}`;
        await RNFS.copyFile(file.uri, destPath);

        const newPDF = {
          name: file.name,
          uri: destPath,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          date: new Date().toLocaleDateString(),
        };

        const updatedPDFs = [newPDF, ...pickedPDFs];
        setPickedPDFs(updatedPDFs);
        await AsyncStorage.setItem(
          'saved_doc_pdfs',
          JSON.stringify(updatedPDFs),
        );
      }
    } catch (err) {
      if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
        Alert.alert('Cancelled', 'File picking cancelled');
      }
    }
  };

  const handleDelete = index => {
    Alert.alert(
      'Delete PDF',
      'Are you sure you want to delete  this PDF',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedPDFs = [...pickedPDFs];
              updatedPDFs.splice(index, 1);
              setPickedPDFs(updatedPDFs);
              await AsyncStorage.setItem(
                'saved_doc_pdfs',
                JSON.stringify(updatedPDFs),
              );
            } catch (error) {
              console.error('Error deleting PDF:', error);
              Alert.alert('Error', 'Failed to delete PDF');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PDFReader', {uri: item.uri})}>
      <Icon name="file-pdf-box" size={30} color="red" />
      <View style={styles.details}>
        <Text style={styles.filename}>{item.name}</Text>
        <Text style={styles.meta}>
          {item.size} | {item.date}
        </Text>
      </View>
      {/* <Icon name="dots-vertical" size={20} color="#555" /> */}
      <TouchableOpacity onPress={() => handleDelete(index)}>
        <Icon name="dots-vertical" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F44336" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PDF Viewer</Text>
        <TouchableOpacity onPress={handleFilePick}>
          <Feather
            name="search"
            size={25}
            color="#fff"
            style={{marginRight: 20}}
          />
        </TouchableOpacity>
      </View>

      {/* PDF List */}
      {pickedPDFs.length === 0 ? (
        <View style={{flex: 1, backgroundColor: '#0F1417'}}>
          <Text style={styles.noFiles}>No PDFs yet. Search PDF's</Text>
        </View>
      ) : (
        <FlatList
          data={pickedPDFs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            flex: 1,
            padding: 10,
            backgroundColor: '#0F1417',
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    backgroundColor: '#F44336',
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  noFiles: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 0.4,
    borderColor: '#ccc',
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  filename: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  meta: {
    fontSize: 13,
    color: '#fff',
    marginTop: 3,
  },
});

export default PDFViewerScreen;
