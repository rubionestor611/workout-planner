import { StyleSheet, Button, Text, Image, View, SafeAreaView } from 'react-native';
import React from 'react';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
      <Text style = {styles.textStyle}> 
          Welcome!
      </Text>
      
      <Image source={require('./assets/favicon.png')} />

      <Button 
        title="Login"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"/>

      <Button 
        title="Register"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"/>

    </SafeAreaView>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    fontSize: 30,
    fontWeight: 'bold',
  }
});
