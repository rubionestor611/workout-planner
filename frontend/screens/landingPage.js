import { StyleSheet, Button, TouchableOpacity, Text, Image, View, SafeAreaView, TextInput } from 'react-native';
import React from 'react';

const LandingPage = () => {
    return  (
        <View style={{flex : 1}}>
            <Text>Hello Adam Smith</Text>
                
            <Text>Create a Workout from:</Text>

            <TouchableOpacity style={styles.CreateWorkoutBttns}>
                <Text style={styles.CreateWorkoutText}>Scratch</Text>
                <Text style={styles.CreateWorkoutText}>Template</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
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

export default LandingPage; 