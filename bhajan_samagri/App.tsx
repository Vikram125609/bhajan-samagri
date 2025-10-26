import * as React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

export default function App() {
  const [photo, setPhoto] = React.useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset && asset.uri) {
          setPhoto(asset.uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {
        !photo &&
        <Button title="Pick Image" onPress={pickImage} />
      }
      <View style={styles.container}>
        {photo && (
          <Image
            source={{ uri: photo }}
            style={{ flex: 1 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#d50000',
  },
});