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
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { API_URL, PORT } from "@env";
const baserUrl = API_URL + PORT + '/';

//export default function App() {
class Login extends React.Component {
    //constructor (state and such)
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.passwordRef = React.createRef();
        // bind all functions to class
        this.emailInputHandler = this.emailInputHandler.bind(this);
        this.passwordInputHandler = this.passwordInputHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }
      
    // functions
    emailInputHandler(enteredEmail){
        this.setState({email: enteredEmail});
    }
      
    passwordInputHandler(enteredPassword){
        this.setState({password: enteredPassword});
    }

    loginHandler(){
        axios.post(baserUrl + "users/login", {
            email: this.state["email"],
            password: this.state["password"]
        })
        .then((response) => {
            if (response.status == 200)
            {
                // Go to landing Page here
                console.log("Logged in")
                this.props.navigation.navigate("landingPage");
            }
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <ScrollView
                bounces={false}
                contentContainerStyle={styles.container}
                >
                <KeyboardAvoidingView
                    behavior = {"position"/*Platform.OS === "ios" ? "padding" : "height"*/}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 5}>
                    <Image style={styles.image}
                        source={require('../../assets/workout.png')} />
                    <View style={styles.textcontainer}>
                        <Text style = {styles.heading}> Welcome! </Text>
                        <Text style = {styles.text}> You will have everything you need to reach your personal fitness goals - for free! </Text>
                    </View>
    
                    <View style={styles.buttoncontainer}>
                        <TextInput style={styles.inputstyle} 
                            placeholder="Email"
                            returnKeyType="next"
                            onSubmitEditing={() => {this.passwordRef.current.focus();}}
                            blurOnSubmit={false}
                            keyboardType="email-address"
                            onChangeText={(text) => this.emailInputHandler(text)}/>
    
                        <TextInput style={styles.inputstyle} 
                            placeholder="Password"
                            returnKeyType="go"
                            ref={this.passwordRef}
                            secureTextEntry
                            onChangeText={(text) => {this.passwordInputHandler(text)}}/>
    
                        <Button
                            title="Login"
                            color="#10B9F1"
                            // expecting line below to turn into authentication or page switching soon enough //
                            onPress={() => this.loginHandler()}/>
    
                        <Button 
                            title="Create an account"
                            color="#C4C4C4"
                            accessibilityLabel="Create an account"/>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView> 
        )
    }
}
      
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textcontainer: {
        flex: .8,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
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
});
      
export default Login;