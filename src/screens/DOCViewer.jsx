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
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';

const DocsViewerScreen = () => {
  const navigation = useNavigation();

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const saved = await AsyncStorage.getItem('saved_doc_files');
        if (saved) setDocs(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading DOCs:', err);
      }
    };
    loadDocs();
  }, []);

  const openDOC = async uri => {
    try {
      await Share.open({
        url: 'file://' + uri,
        type: 'application/msword',
        showAppsToView: true,
      });
    } catch (error) {
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'No app found to open this document.');
      }
    }
  };
  const handleFilePick = async () => {
    try {
      const [file] = await pick({
        type: [
          'application/msword', // .doc
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        ],
      });

      if (!file) return;

      const destPath = `${RNFS.DocumentDirectoryPath}/${file.name}`;
      await RNFS.copyFile(file.uri, destPath);

      const newDoc = {
        name: file.name,
        uri: destPath,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        date: new Date().toLocaleDateString(),
      };

      const updated = [newDoc, ...docs];
      setDocs(updated);
      await AsyncStorage.setItem('saved_doc_files', JSON.stringify(updated));
    } catch (err) {
      if ((err?.message || '').toLowerCase().includes('canceled')) return;
      Alert.alert('Error', 'Failed to pick DOC file');
    }
  };

  const handleDelete = index => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete  this Document',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedDocs = [...docs];
              updatedDocs.splice(index, 1);
              setPickedPDFs(updatedDocs);
              await AsyncStorage.setItem(
                'saved_doc_pdfs',
                JSON.stringify(updatedDocs),
              );
            } catch (error) {
              console.error('Error deleting PDF:', error);
              Alert.alert('Error', 'Failed to delete Document');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.item} onPress={() => openDOC(item.uri)}>
      <Icon name="file-word-outline" size={30} color="#2D7BDB" />
      <View style={styles.details}>
        <Text style={styles.filename}>{item.name}</Text>
        <Text style={styles.meta}>
          {item.size} | {item.date}
        </Text>
      </View>

      <TouchableOpacity onPress={() => handleDelete(index)}>
        <Icon name="dots-vertical" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2D7BDB" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DOC Viewer</Text>
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
      {docs.length === 0 ? (
        <Text style={styles.noFiles}>No PDFs yet. Search Documents</Text>
      ) : (
        <FlatList
          data={docs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{padding: 10}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0F1417'},
  header: {
    backgroundColor: '#2D7BDB',
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
    color: '#999',
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

export default DocsViewerScreen;
