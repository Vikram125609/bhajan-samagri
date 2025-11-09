import { useNavigation } from '@react-navigation/native';
import { Button, Animated, Text, View } from 'react-native';
import Header from '../components/Header';

interface Props {
  translateX: Animated.Value
}

function HomeScreen({ translateX }: Props) {

  
  const openSidebar = () => {
    Animated.timing(translateX, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300
    }).start();
  }
  return (
    <View style={{ flex: 1 }}>
      <Header title='Bhajan Samagri' openSidebar={openSidebar} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Home Screen
        </Text>
      </View>
    </View>
  );
}

export default HomeScreen