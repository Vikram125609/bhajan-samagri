import {useNavigation} from '@react-navigation/native';
import { Button } from 'react-native';


function HomeScreen({navigation}: any) {
  return (
    <Button title="Go to Jane's profile" onPress={() => navigation.navigate('Profile', {})}/>
  );
}

export default HomeScreen