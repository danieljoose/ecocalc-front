import React from 'react';
import {createDrawerNavigator } from '@react-navigation/drawer';
import Logo from "../assets/logo-no-name.svg";
import DashboardIcon from "../assets/dashboard.svg";
import Dashboard from '../pages/Dashboard';
import Pessoas from '../pages/Pessoas';
import DrawerContent from '../pages/DrawerContent';
import { useWindowDimensions } from 'react-native';

const Drawer= createDrawerNavigator();
 
function AuthRoutes(){

    const dimensions = useWindowDimensions();
    return(
        <Drawer.Navigator
          drawerContent={props => <DrawerContent {...props}/>}
          screenOptions={{
            drawerLabelStyle: {
              marginLeft: -20,
              color: 'white', 
            },
            drawerActiveBackgroundColor: '#327368',
            // headerTransparent: true,
            headerStyle: {
              backgroundColor: 'transparent',
              borderColor: 'transparent'
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18
            },
            headerTintColor: '#4C9D8F',
            drawerStyle: {
              backgroundColor: '#4C9D8F',
              width: 280,
            },         
          }}
          initialRouteName="Dashboard">
            <Drawer.Screen
             name="Dashboard"
             component={Dashboard}   
             options={{
                drawerIcon: config => <DashboardIcon/>
              }}         
            /> 
             <Drawer.Screen
             name="Pessoas"
             component={Pessoas}   
             options={{
                drawerIcon: config => <DashboardIcon/>
              }}         
            /> 
        </Drawer.Navigator>
    )
}

export default AuthRoutes;