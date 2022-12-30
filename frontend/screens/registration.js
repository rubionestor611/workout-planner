import { StyleSheet, Button, Text, Image, View, SafeAreaView, TextInput } from 'react-native';
import React from 'react';

const Register = () => {
    return  (
        <View style={{flex : 1}}>
            <Text>Tell us a little about yourself</Text>
            <TextInput style={styles.inputstyle} 
            placeholder="Username"
            returnKeyType="next"
            keyboardType="email-address"
             onChangeText={usernameInputHandler}/>

            <TextInput style={styles.inputstyle} 
            placeholder="Password"
            returnKeyType="go"
            secureTextEntry
            onChangeText={passwordInputHandler}/>
        </View>
    )
}

export default Register; 