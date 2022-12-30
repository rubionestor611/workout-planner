import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './frontend/screens/registration';
import Home from './frontend/screens/registration';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator> 
    </Stack.Navigator>
  );
}

export default Navigation;