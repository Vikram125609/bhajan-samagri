import * as React from 'react';
import { Text, Dimensions, Animated } from 'react-native';
import Sidebar from './src/components/Sidebar';
import CounterScreen from './src/screens/CounterScreen';
import { View, ScrollView } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
export default function App() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75;
  const translateX = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  return (
    <>
      <Sidebar translateX={translateX} />
      <HomeScreen translateX={translateX} />
    </>
  );
}