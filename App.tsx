// import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";

import CameraScreen from './screens/CameraScreen';
import FeedScreen from './screens/FeedScreen';
import ImagesScreen from './screens/ImagesScreen';

type MainBottomTabParamList = {
  Camera: undefined;
  Images: undefined;
  Feed: undefined;
  };

interface ScreenOptionsProps {
  route :  RouteProp<MainBottomTabParamList, keyof MainBottomTabParamList>;
  navigation: any;
   
}

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const screenOptions = ({ route } : ScreenOptionsProps ) : BottomTabNavigationOptions => {
    let iconName : React.ComponentProps<typeof Ionicons>["name"];

    return ({
      tabBarIcon: ({focused, color, size}) : React.ReactNode => {
        switch (route.name) {
          case 'Camera':
            iconName = focused ? 'camera' : 'camera-outline'
            break;
          case 'Images':
            iconName = focused ? 'image' : 'image-outline'
            break;
          case 'Feed':
            iconName = focused ? 'share-social' : 'share-social-outline'
            break;
          default: 
            break;
        }
        return <Ionicons name={iconName } size={size} color={color} />;
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
    })
}

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator
         screenOptions={ screenOptions }
        >
          <Tab.Screen
            name="Camera" 
            component={CameraScreen} 
            options={{ unmountOnBlur: true }}
          />
          <Tab.Screen
            name="Images"
            component={ImagesScreen}
            options={{ unmountOnBlur: true }}
          />
          <Tab.Screen
            name="Feed"
            component={FeedScreen}
            options={{ unmountOnBlur: true }}
          />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

