import * as React from 'react';
import { View, Text, Image, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function App() {
  const images: string[] = [
    'https://drive.usercontent.google.com/download?id=1eTlqUjijNVzuFKt6ADR3ywAbhLP2qqT0&export=view&authuser=0',
    'https://drive.usercontent.google.com/download?id=1dfuQjYG8kIBpVv59qpa_qZAqKzmtN99Q&export=view&authuser=0',
    'https://drive.usercontent.google.com/download?id=10MRdUUXCVnoK9Ew8TPXQ56qZlpyMBLYG&export=view&authuser=0',
    'https://drive.usercontent.google.com/download?id=1SfRf3jyiRdEtEpHdiaLqvHnZanrrtu--&export=view&authuser=0',
    'https://drive.usercontent.google.com/download?id=1-3jsXgQoOnh2UAOkiG1AgvFr-pOQkSqu&export=view&authuser=0',
  ];

  const [photoIndex, setPhotoIndex] = React.useState(0);
  const [totalMalas, setTotalMalas] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [imageHeight, setImageHeight] = React.useState<number>(200);
  const [imageLoading, setImageLoading] = React.useState(true);
  const holdStartRef = React.useRef<number | null>(null);
  const screenWidth = Dimensions.get('window').width;
  const ringSize = 150;
  const strokeWidth = 15;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const maxCount = 108;
  const progress = Math.min(count / maxCount, 1);
  const strokeDashoffset = circumference * (1 - progress);

  const handlePressIn = () => {
    holdStartRef.current = Date.now();
  };

  const handlePressOut = () => {
    if (holdStartRef.current) {
      const holdDuration = Date.now() - holdStartRef.current;
      if (holdDuration >= 1000) {
        setCount((prev) => {
          if (prev === maxCount) {
            setTotalMalas((prev) => prev + 1);
            setCount(0);
          }
          return prev + 1
        });
      }
      holdStartRef.current = null;
    }
  };

  const handleChangeImage = () => {
    setImageLoading(true);
    setPhotoIndex((prev) => (prev + 1) % images.length);
  };

  const onImageLoadStart = () => {
    setImageLoading(true);
  };

  const onImageLoad = (e: any) => {
    const { width, height } = e.nativeEvent.source;
    const ratio = height / width;
    setImageHeight(screenWidth * ratio);
    setImageLoading(false);
  };

  return (
    <View style={{ backgroundColor: '#9b35daff', height: '100%' }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ position: 'relative' }}>
          {imageLoading && (
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 8,
              marginVertical: 10,
              width: screenWidth - 20,
              height: imageHeight,
            }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
          <Image
            source={{ uri: images[photoIndex] }}
            onLoadStart={onImageLoadStart}
            onLoad={onImageLoad}
            style={{
              width: screenWidth - 20,
              height: imageHeight,
              resizeMode: 'cover',
              marginVertical: 10,
              borderRadius: 8,
            }}
          />
        </View>
        <View style={{ backgroundColor: '#f0ad4e', width: '50%', margin: 'auto', borderRadius: 8, marginBottom: 10 }}>
          <Pressable onPress={handleChangeImage} style={{ padding: 5 }}>
            <Text style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 18,
              textAlign: 'center'
            }}>
              Change Image
            </Text>
          </Pressable>
        </View>
      </View>

      <Pressable 
        onPressIn={handlePressIn} 
        onPressOut={handlePressOut} 
        style={{ 
          alignItems: 'center', 
          justifyContent: 'center',
          flex: 1,
          paddingTop: 40
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={ringSize} height={ringSize} style={{ transform: [{ rotate: '-90deg' }] }}>
            <Circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke="#cdc3c3ff"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke="#ffffff"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </Svg>
          <View style={{ position: 'absolute', alignItems: 'center' }}>
            <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#ffffff' }}>
              {count}
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 30, fontSize: 16, color: '#ffffff', textAlign: 'center' }}>
          Total Malas {totalMalas}
        </Text>
      </Pressable>
    </View>
  );
}