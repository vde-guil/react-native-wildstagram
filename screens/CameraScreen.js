import {useState, useEffect, useRef} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

import * as ImageManipulator from "expo-image-manipulator";

const CameraScreen = ({}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);

    const getPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    const takePicture = async () => {
        const pictureMetadata = await cameraRef.current.takePictureAsync();
        // console.log("image", pictureMetadata);
        // console.log(
            await ImageManipulator.manipulateAsync(
                pictureMetadata.uri,
                [
                    {
                        resize: {width: 800},
                    }
                ]
            )
        // );
    }

    useEffect(() => {
        getPermissions();
    }, []);

    if (hasPermission === null) {
        return <View/>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
    <View style={styles.cameraContainer} >
        <Camera style={styles.cameraContainer} type={type} ref={cameraRef} />
        <Button
            onPress={takePicture}
            title="Take a picture"
         />
         <Button
            onPress={()=>{
                console.log("change")
                setType(type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    :  Camera.Constants.Type.back)
            }
            }
            title="Flip Camera"
         />
    </View>
    );
}

const styles = StyleSheet.create(
    {
        cameraContainer: {
            flex: 1,
        },
    }
)

export default CameraScreen;