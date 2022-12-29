import { StyleSheet, Button, Text, Image, View, SafeAreaView } from 'react-native';
import React from 'react';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.image}
        source={require('./assets/workout.png')} />

      <Text style = {styles.heading}> Welcome! </Text>
      <Text style = {styles.text}>You will have everything you need to reach your personal fitness goals - for free! </Text>
      
      <Button
        title="Login"
        color="#10B9F1"
        onPress={() => Alert.alert('Simple Button pressed')}
      />

      <Button 
        title="Create an account"
        color="#C4C4C4"
        accessibilityLabel="Create an account"/>

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
  text:{
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#C4C4C4',
    margin: 16,
    textAlign: 'center',
  },
  heading:{
    color: '#2B2B2B',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 36,
    position: 'absolute',
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    top: 0
  },
  login: {
    backgroundColor: '#10B9F1',
  }
});
