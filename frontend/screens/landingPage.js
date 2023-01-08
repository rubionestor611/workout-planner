import { StyleSheet, Button, TouchableOpacity, Text, Image, View, SafeAreaView, TextInput } from 'react-native';
import React from 'react';

const landingPage = () => {
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

export default landingPage; 