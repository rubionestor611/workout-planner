import { StyleSheet, Button, Text, Image, View, SafeAreaView, TextInput } from 'react-native';
import React from 'react';



export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.image}
        source={require('./assets/workout.png')} />
      
      <View style={styles.textcontainer}>
        <Text style = {styles.heading}> Welcome! </Text>
        <Text style = {styles.text}>You will have everything you need to reach your personal fitness goals - for free! </Text>
      </View>

      <View style={styles.buttoncontainer}>
        <TextInput style={styles.inputcontainer} placeholder="Username"/>
        <TextInput style={styles.inputcontainer} placeholder="Password"/>

        <Button
        title="Login"
        color="#10B9F1"
        onPress={() => Alert.alert('Simple Button pressed')}/>

        <Button 
        title="Create an account"
        color="#C4C4C4"
        accessibilityLabel="Create an account"/>
      </View>
      
    </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttoncontainer:{
    flex: 1,
  },
  heading:{
    color: '#2B2B2B',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 36,
    textAlign: 'center',
    paddingBottom:5,
  },
  text:{
    fontFamily: 'HelveticaNeue',
    fontWeight: 400,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#C4C4C4',
    textAlign: 'center',
  },
  image: {
    top: 0,
    marginBottom: 0,
  },
  login: {
    backgroundColor: '#10B9F1',
  },
  inputcontainer:{
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#fffff"',
    width: '80%',
    padding: 4
  },
});
