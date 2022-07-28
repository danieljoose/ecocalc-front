import React from "react";
import { View, Text, Button, TouchableOpacity } from 'react-native'
import SuccessIcon from "../../assets/success.svg";
import { Stack, IconButton } from "@react-native-material/core";
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"

const AddDespesaSuccess = ({navigation}) =>{
    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 30 }}>
            <SuccessIcon/>

            <Subtitle style={{fontSize: 15, marginTop: '15%', marginBottom: '15%'}}>
            Despesa criada com sucesso!
            Clique no botão abaixo para criar uma nova despesa ou volte para pagina principal.</Subtitle>           

            <PressableButton
                onPress={()=>navigation.navigate('Despesa')}
                title='Nova despesa'
            />

            <PressableButton
                onPress={()=> navigation.navigate('Dashboard')}
                title='Página Inicial'
                variant="third"
                
            />

        </View>
    )
}

export default AddDespesaSuccess