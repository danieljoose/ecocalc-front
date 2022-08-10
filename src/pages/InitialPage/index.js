import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import Logo from "../../assets/logo.svg";
import styled from "styled-components/native";
import { Subtitle, TouchableText, SmallText } from "../../style/texts"
import { PressableButton } from "../../style/button"


const InitialPage = ({ navigation }) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Logo/>
            <Subtitle style={{marginTop: 35, marginBottom: 50, maxWidth: '80%', textAlign: 'center'}}>
                {`Gerencie suas despesas \nresidênciais e pessoais aqui`}
            </Subtitle>

            <PressableButton
                onPress={() => navigation.navigate('Login')}
                title='Login'
                style={{marginTop: '20px'}}
            />

            <PressableButton
                onPress={() => navigation.navigate('Cadastro')}
                title='Cadastre-se'
                variant="secondary"
            />
{/* 
            <View style={{flexDirection: 'row'}}>                
                    <SmallText>
                        Esqueceu sua senha?
                    </SmallText>
                <TouchableOpacity onPress={()=>true}> 
                    <TouchableText>
                        {` Clique aqui`}
                    </TouchableText>
                </TouchableOpacity>
            </View> */}
        </View>        
    )
}

export default InitialPage