import * as React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function App() {
  const [photo, setPhoto] = React.useState<string | null>(null);
  const [count, setCount] = React.useState(0);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const holdStartRef = React.useRef<number | null>(null);

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
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

  const handlePressIn = () => {
    holdStartRef.current = Date.now();
  };

  const handlePressOut = () => {
    if (holdStartRef.current) {
      const holdDuration = Date.now() - holdStartRef.current;
      if (holdDuration >= 1000) {
        setCount((prev) => prev + 1);
      }
      holdStartRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </Pressable>

        {photo && (
          <Pressable
            onPress={() => console.log('On Press')}
            onLongPress={() => console.log('Long Press')}
            onPressIn={() => console.log('Press In')}
            onPressOut={() => console.log('Press Out')}
          >
            <Image
              source={{ uri: photo }}
              style={{
                flex: 1,
                width: 'auto',
                height: 300,
                resizeMode: 'contain',
                marginVertical: 10,
              }}
            />
          </Pressable>
        )}

        <Pressable
          style={[styles.button, { backgroundColor: '#5cb85c', marginVertical: 15 }]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.buttonText}>Hold 1s then Release (Naam Jap)</Text>
        </Pressable>

        <Text style={styles.countText}>Count: {count}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  countText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'lightblue',
    width: '70%',
    height: '40%',
    marginTop: '30%',
    marginHorizontal: '15%',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});