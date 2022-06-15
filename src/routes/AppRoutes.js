import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';import Logo from "../assets/logo-no-name.svg";
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import InitialPage from '../pages/InitialPage';
import { useWindowDimensions } from 'react-native';



const Stack = createStackNavigator();

function AppRoutes(){

    const dimensions = useWindowDimensions();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="InitialPage">
            <Stack.Screen name="InitialPage" component={InitialPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
    )
}

export default AppRoutes;