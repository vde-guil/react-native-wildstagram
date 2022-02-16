import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import singleFileUploader from "single-file-uploader";
import { Text, Image, View, StyleSheet, FlatList, Button } from 'react-native';



const ImagesScreen = ({}) => {

    const [imageList, setImageList] = useState([])

    const getImages = async () => {
        try {
            const images = await FileSystem.readDirectoryAsync(
                `${FileSystem.cacheDirectory}/ImageManipulator`
            );
            setImageList( images.length ? [...images] : []);
        }
        catch (error) {
            console.log("there was an error")
        }

    }

    useEffect(() => {
        getImages();        
    }, []);

    const uploadImage = async (imgFileName) => {
       try {
           await singleFileUploader(
               {
                  distantUrl:"https://wildstagram.nausicaa.wilders.dev/upload",
                  filename: imgFileName,
                  filetype: "image/jpeg",
                  formDataName: "fileData",
                  localUri: FileSystem.cacheDirectory + "ImageManipulator/" + imgFileName,
               });
            alert ("Uploaded")
       } catch (error) {
            alert("Error: couldn't upload")
       }
    }

    const deleteImage = async (imgFileName) => {

        try {
            await FileSystem.deleteAsync(
                `${FileSystem.cacheDirectory}/ImageManipulator/${imgFileName}`
            );
            setImageList(prev => prev.filter(currentImgName => currentImgName !== imgFileName))
        }
        catch (error) {
            console.log("there was an error")
        }
    }

    const renderItem = ({item, ...rest}) => {
        return (
            <View
                style={styles.imageContainer}
            >
                <Image
                style={styles.image}

                    source={
                            {
                                uri: `${FileSystem.cacheDirectory}/ImageManipulator/${item}`,
                            }
                        }   
                />
                <Button
                    title="upload"
                    onPress={() => uploadImage(item)}
                />
                 <Button
                    title="delete"
                    onPress={() => deleteImage(item)}
                />
            </View>
        )
    }

    if (imageList.length === 0)
        return <View></View>

    return (
        <FlatList
            style={styles.container}
            data={imageList}
            renderItem={renderItem}
            keyExtractor={(item) => item}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    imageContainer: {
        marginHorizontal: 5,
        marginTop: 5
    },

    image: {
        resizeMode: 'cover',
        height: 500,
    }
})

export default ImagesScreen;