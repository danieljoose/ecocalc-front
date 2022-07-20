import React from 'react';
import {createDrawerNavigator } from '@react-navigation/drawer';
import Logo from "../assets/logo-no-name.svg";
import DashboardIcon from "../assets/dashboard.svg";
import AddResidenciaIcon from "../assets/icon-add-residencia.svg";
import AddPessoaIcon from "../assets/icon-add-pessoa.svg";
import PessoaIcon from "../assets/person-icon.svg";
import DespesaIcon from "../assets/despesa.svg";
import Dashboard from '../pages/Dashboard';
import Pessoas from '../pages/Pessoas';
import Despesa from '../pages/Despesa';
import DespesaResidencial from '../pages/Despesa/DespesaResidencial';
import DespesaPessoal from '../pages/Despesa/DespesaPessoal';
import AddResidencia from '../pages/AddResidencia';
import AddPessoa from '../pages/AddPessoa';
import AddPessoaSuccess from '../pages/AddPessoa/AddPessoaSuccess';
import DrawerContent from '../pages/DrawerContent';
import { useWindowDimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer= createDrawerNavigator();
const Stack = createStackNavigator();
 
function AuthRoutes(){

  const StackDespesa = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Despesa" component={Despesa}  />
      <Stack.Screen name="DespesaResidencial" component={DespesaResidencial} />
      <Stack.Screen name="DespesaPessoal" component={DespesaPessoal} />
    </Stack.Navigator>
  );

    const dimensions = useWindowDimensions();
    return(
        <Drawer.Navigator
          drawerContent={props => <DrawerContent {...props}/>}
          screenOptions={{
            unmountOnBlur: true,
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
                drawerIcon: config => <DashboardIcon/>,
                tabBarLabel: 'Home!'
              }}         
            /> 
            <Drawer.Screen
             name="Adicionar despesa"
             component={StackDespesa}   
             options={{
                drawerIcon: config => <DespesaIcon/>
              }}         
            /> 
            <Drawer.Screen
             name="Adicionar residência"
             component={AddResidencia}  
             options={{
                drawerIcon: config => <AddResidenciaIcon/>
              }}         
            /> 
            <Drawer.Screen
             name="Adicionar pessoa"
             component={AddPessoa}   
             options={{
                drawerIcon: config => <AddPessoaIcon/>
              }}         
            /> 
            <Drawer.Screen
             name="Pessoas"
             component={Pessoas}   
             options={{
                drawerIcon: config => <PessoaIcon/>
              }}         
            /> 
            <Drawer.Screen name="Adicionar pessoa " component={AddPessoaSuccess}
              options={{
                drawerItemStyle: { display: 'none' }
              }}
            />
        </Drawer.Navigator>
    )
}

export default AuthRoutes;