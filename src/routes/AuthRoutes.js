import React from 'react';
import {createDrawerNavigator } from '@react-navigation/drawer';
import Logo from "../assets/logo-no-name.svg";
import Login from '../pages/Login';
import { useWindowDimensions } from 'react-native';



const Drawer= createDrawerNavigator();
 
function AuthRoutes(){

    const dimensions = useWindowDimensions();
    return(
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#4C9D8F',
              width: 340,
            },         
          }}
          initialRouteName="Login">
            {/* <Drawer.Screen
             name="Login"
             component={Login}   
             options={{
                drawerIcon: config => <Logo/>
              }}         
            />  */}
        </Drawer.Navigator>
    )
}

export default AuthRoutes;