import React from "react";
import { View, Text, Button, TouchableOpacity } from 'react-native'
import SuccessIcon from "../../assets/success.svg";
import { Stack, IconButton } from "@react-native-material/core";
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"

const AddResidenciaSuccess = ({navigation}) =>{
    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 30 }}>
            <SuccessIcon/>

            <Subtitle style={{fontSize: 15, marginTop: '15%', marginBottom: '15%'}}>
            Residência criada com sucesso!
            Clique no botão abaixo para criar uma nova despesa para essa residência ou cadastre uma nova pessoa para alocar a sua nova residência.</Subtitle>           

            <PressableButton
                onPress={console.log("sae")}
                title='Nova despesa'
            />

            <PressableButton
                onPress={console.log("sae")}
                title='Nova pessoa'
            />

            <PressableButton
                onPress={()=> navigation.navigate('Dashboard')}
                title='Página Inicial'
                variant="third"
                
            />

        </View>
    )
}

export default AddResidenciaSuccess