/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "./src/Screen/CalendarScreen";
import AddEvent from "./src/Screen/AddEvent";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectApp from "./src/Screen/SelectApp";
import Login from "./src/Screen/Login";
import HomeScreen from "./src/Screen/HomeScreen";
import ChatScreen from "./src/Screen/ChatScreen";
import SelectCountry from "./src/Screen/SelectCountry";
import RatingScreen from "./src/Screen/Rating";
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetUserList from "./src/Screen/GetUserList";
import CreateGroup from "./src/Screen/CreateGroup";
import GroupDetail from "./src/Screen/GroupDetail"

const Stack = createNativeStackNavigator();

export default function App() {

  const [isLogin, setLogin] = useState(0)

  useEffect(() => {
    checkauthState()
    getNotification()
    checkuser()
  }, [])

  async function checkuser() {
    AsyncStorage.getItem('user').then(res => {
      setLogin(res)
    })
  }

  async function getNotification() {
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(async payload => {
      console.log('payload', payload);
      dispatch({ type: SCREEN, payload: payload })
    })

    messaging().getInitialNotification().then(remoteMessage => {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage,
      );
      if (remoteMessage != null) {
        dispatch({ type: SCREEN, payload: remoteMessage })
      }
    });
  }

  async function checkauthState() {
    const authStatus = await messaging().requestPermission();
    console.log("authStatus", authStatus);
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log("enabled", enabled);
    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFCMToken()
    }
  }

  async function getFCMToken() {

    console.log("reach2");

    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log("fc", fcmToken);

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log("fcmToken", fcmToken);

        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }

  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {isLogin == 0 ?
        <ActivityIndicator color={'black'} size={'large'} style={{ padding: 30 }} /> :
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={!isLogin ? 'SelectApp' : 'GetUserList' }
          >
            <Stack.Screen name="SelectCountry" component={SelectCountry} />
            <Stack.Screen name="RatingScreen" component={RatingScreen} />
            <Stack.Screen name="GetUserList" component={GetUserList} />
            <Stack.Screen name="SelectApp" component={SelectApp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CreateGroup" component={CreateGroup} />
            <Stack.Screen name="GroupDetail" component={GroupDetail} />
            
             <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
            <Stack.Screen name="AddEvent" component={AddEvent} />
          </Stack.Navigator>
        </NavigationContainer>}
    </SafeAreaView>
  );
}
