import RNFS from 'react-native-fs';
import { Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function CachedImage({ imageUrl, setImageLoading }: { imageUrl: string, imageLoading: boolean, setImageLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [localPath, setLocalPath] = useState<string | null>(null);
    const [imageHeight, setImageHeight] = React.useState<number>(240);
    const screenWidth = Dimensions.get('window').width;

    const onImageLoad = (e: any) => {
        const { width, height } = e.nativeEvent.source;
        const ratio = height / width;
        setImageHeight(screenWidth * ratio);
        setImageLoading(false);
    };

    const onImageLoadStart = () => {
        setImageLoading(true);
    };

    useEffect(() => {
        const downloadImage = async () => {
            const match = imageUrl.match(/[?&]id=([^&]+)/);
            const filename = match ? match[1] : null;
            const localFilePath = `${RNFS.CachesDirectoryPath}/${filename}`;
            const exists = await RNFS.exists(localFilePath);
            console.log(localFilePath)
            if (exists) {
                setLocalPath(`file://${localFilePath}`);
                setImageLoading(false);
                return;
            }
            try {
                await RNFS.downloadFile({
                    fromUrl: imageUrl,
                    toFile: localFilePath,
                }).promise;
                setLocalPath(`file://${localFilePath}`);
                setImageLoading(false);

            } catch (err) {
                console.error('Download error:', err);
            }
        };
        downloadImage();
    }, [imageUrl]);

    return localPath ? (
        <Image
            source={{ uri: localPath }}
            style={{
                width: screenWidth - 20,
                height: imageHeight,
                resizeMode: 'cover',
                borderRadius: 8,
            }} />
    ) : (
        <Image
            onLoadStart={onImageLoadStart}
            onLoad={onImageLoad}
            source={{ uri: imageUrl }}
            style={{
                width: screenWidth - 20,
                height: imageHeight,
                resizeMode: 'cover',
                borderRadius: 8,
            }} />
    );
}
