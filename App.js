/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from './src/Screen/CalendarScreen';
import AddEvent from './src/Screen/AddEvent';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }} initialRouteName="Home">
          <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
          <Stack.Screen name="AddEvent" component={AddEvent} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
