// import {pick, types} from '@react-native-documents/picker';
// import React from 'react';
// import {Alert, Button, StyleSheet, Text, View} from 'react-native';

// const OrganiseScreen = () => {
//   const handleFilePick = async () => {
//     try {
//       const [file] = await pick({
//         type: [types.allFiles],
//       });
//       if (file) {
//         console.log('Picked file', file);
//         Alert.alert(
//           'File Picked',
//           `Name: ${file.name}\nSize: ${file.size ?? 'Unknown'}`,
//         );
//       }
//     } catch (error) {
//       if (err && err.code === 'DOCUMENT_PICKER_CANCELED') {
//         Alert.alert('Cancelled', 'File picking cancelled');
//       } else {
//         console.error('DocumentPicker Error:', err);
//         Alert.alert('Error', 'Something went wrong while picking a file');
//       }
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Pick a File</Text>
//       <Text style={styles.title}>Pick a File</Text>
//       <Button title="Choose File" onPress={handleFilePick} />
//     </View>
//   );
// };

// export default OrganiseScreen;

// const styles = StyleSheet.create({
//   container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
//   title: {fontSize: 18, marginBottom: 10},
// });

import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {pick, types} from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';

const OrganiseScreen = () => {
  const navigation = useNavigation();

  const handleFilePick = async () => {
    try {
      const [file] = await pick({type: [types.pdf]});

      if (file) {
        const destPath = `${RNFS.DocumentDirectoryPath}/${file.name}`;

        await RNFS.copyFile(file.uri, destPath);

        navigation.navigate('PDFViewer', {localPath: destPath});
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', 'Could not open the file. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick and Open PDF</Text>
      <Button title="Choose PDF" onPress={handleFilePick} />
    </View>
  );
};

export default OrganiseScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 18, marginBottom: 10},
});
