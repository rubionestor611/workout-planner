import React from 'react';
import Login from './frontend/screens/login';
import LandingPage from './frontend/screens/landingPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login" >
          <Stack.Screen name="login" 
          component={Login}
          options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="landingPage" component={LandingPage}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
};