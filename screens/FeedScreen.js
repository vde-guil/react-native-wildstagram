import {useState, useEffect} from 'react';
import axios from 'axios';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';

const API_URL = 'https://wildstagram.nausicaa.wilders.dev';

const getFeedImages = () => {
    console.log("refreshing")
    return axios.get(`${API_URL}/list`);
}

const FeedScreen = ({}) => {
    const [feedImages, setFeedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(()=> {
        if (isLoading) {
            getFeedImages()
                .then(({data}) => { setFeedImages( (prev) => [...prev, ...data])})
                .catch(error => console.log(error))
                .finally(() => {setIsLoading(false); console.log("loading finished")});
        }
    }, [isLoading])

    const renderItem = ({item}) => {
        return (
            <View
                style={styles.imageContainer}
            >
                <Image
                style={styles.image}

                    source={
                            {
                                uri: `${API_URL}/files/${item}`,
                            }
                        }   
                />
            </View>
        )
    }

    if (feedImages.length === 0)
        return <Text style={styles.loadingText}>No Images found</Text>

    return <FlatList
                style={styles.container}
                data={feedImages}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                refreshing={isLoading}
                onRefresh={() => setIsLoading(true)}
             />
}

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
    },
    loadingText: {
        flex:1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    }
});

export default FeedScreen;