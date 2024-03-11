import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Main from './src/screens/Main';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='welcome' screenOptions={{headerShown : false}}>
        <Stack.Screen name='main' component={Main} />
        <Stack.Screen name='welcome' component={WelcomeScreen} />
        <Stack.Screen name='RecipeDetail' component={RecipeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Home = (props) =>{
  return (
    <View style={{flex:1 , justifyContent:'center' ,alignItems : 'center'}}>
      <Text style={{fontSize: 40}}>
        HI This is home screen
      </Text>
      <Button title='Go go go' onPress={()=>props.navigation.navigate("homeOP")} />
    </View>
  )
}

const HomeOP = () =>{
  return (
    <View style={{flex:1 , justifyContent:'center' ,alignItems : 'center'}}>
      <Text className="bg-slate-600" style={{fontSize: 40}}>
        HI This is home screen 2 OP
      </Text>
    </View>
  )
}


export default App;
