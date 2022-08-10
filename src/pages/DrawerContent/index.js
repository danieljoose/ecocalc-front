import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { 
    DrawerContentScrollView,
    DrawerItem, 
    DrawerItemList } from "@react-navigation/drawer";
import { Paper, Drawer } from 'react-native-paper'
import Logout from "../../assets/logout.svg";
import Logo from "../../assets/logo-no-name.svg";
import AuthContext from '../../contexts/Auth';
import { NavigationEvents } from "react-navigation";

const DrawerContent = (props) => {
    const { logout, user } = useContext(AuthContext)

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={{flexDirection: 'row', margin: 20, color: 'white'}}>
                    <Logo style={{marginRight: 10}} height={45} width={45}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.nome}>{user.nome}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                    
                </View>
                
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={{padding: 20}}>
                <TouchableOpacity
                    onPress={async ()=>{await logout()}}>
                        <View style={{flexDirection: 'row'}}>
                            <Logout />
                            <Text style={{color: 'white', marginLeft: 10}}>Sair</Text>
                        </View>                    
                </TouchableOpacity>
                
            </View>
        </View>


        // <View style={{flex: 1}}>
        //     <DrawerContentScrollView {...props}>
        //         <View>
        //             <Text>Opa</Text>
        //         </View>
        //     </DrawerContentScrollView>
        //     <Drawer.Section style={styles.bottomDrawerSection}>
        //         <Drawer.Item 
        //             style={{borderColor: 'white'}}
        //             labelStyle={{color: 'white'}}
        //             icon={({color, size}) => (
        //                 <Logout
        //                     name='exit'
        //                 />
        //             )}
        //             label="Sair"
        //             onPress={()=>true}
        //         />
        //     </Drawer.Section>
            
        // </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    nome: {
        fontSize: 25,
         marginTop: -5,
         color: 'white'
    },
    email: {
        fontSize: 14.0,
        marginTop: -2,
        color: 'white'
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14.0,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        color: 'white',
        fontSize: 16,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

export default DrawerContent