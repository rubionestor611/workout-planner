import { 
  StyleSheet, 
  Button, 
  Text, 
  Image, 
  View, 
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
//import { KeyboardAvoidingView } from 'react-native-web';

export default function App() {
  
  function usernameInputHandler(enteredUsername){
    console.log(enteredUsername);
  }

  function passwordInputHandler(enteredPassword){
    console.log(enteredPassword);
  }
  
  return (
    <NavigationContainer>
      {
        <ScrollView
        bounces={false}
        contentContainerStyle={styles.container}>
          <KeyboardAvoidingView
          behavior = {"position"/*Platform.OS === "ios" ? "padding" : "height"*/}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 5}
          >
            <Image style={styles.image}
            source={require('./assets/workout.png')} />

            <View style={styles.textcontainer}>
              <Text style = {styles.heading}> Welcome! </Text>
              <Text style = {styles.text}> You will have everything you need to reach your personal fitness goals - for free! </Text>
            </View>

            <View style={styles.buttoncontainer}>
              <TextInput style={styles.inputstyle} 
              placeholder="Username"
              returnKeyType="next"
              onSubmitEditing={() => {this.password.focus();}}
              keyboardType="email-address"
              onChangeText={usernameInputHandler}/>

              <TextInput style={styles.inputstyle} 
              placeholder="Password"
              returnKeyType="go"
              ref={(input) => {}}
              secureTextEntry
              onChangeText={passwordInputHandler}/>
              
              <Button
              title="Login"
              color="#10B9F1"
              onPress={() => Alert.alert('Login Button pressed')}/>

              <Button 
              title="Create an account"
              color="#C4C4C4"
              accessibilityLabel="Create an account"/>

              
            </View>
          </KeyboardAvoidingView>
        </ScrollView>  
      }
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: .9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcontainer: {
    flex: .8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  buttoncontainer:{
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    width: '100%'
  },
  heading:{
    color: '#2B2B2B',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 36,
    textAlign: 'center',
    paddingBottom: 5,
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
  inputstyle:{
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    width: '70%',
    padding:8,
    marginVertical:2
  },
  CreateWorkoutBttns:{
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    width: '100%'
  },
  CreateWorkoutText:{
    fontFamily: 'HelveticaNeue',
    fontWeight: 400,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#C4C4C4',
    textAlign: 'center',
  },
});

