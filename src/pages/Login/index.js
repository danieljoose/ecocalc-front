import React from 'react'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import EcoCalc from "../../assets/ecocalc.svg";
import Pig from "../../assets/pig.svg";
import { Subtitle, TouchableText, SmallText } from "../../style/texts"
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"



const Login = ({ navigation }) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <EcoCalc style={{marginBottom: 60}}/>
            <Pig style={{marginBottom: 20}}/>
            <Subtitle style={{maxWidth: '80%', textAlign: 'center'}}>
                {`Faça seu login para ter\n controle das suas despesas`}
            </Subtitle>

            <Stack style={{width: '75%'}}>
                <Input placeholder="E-mail" style={{marginTop: 30}}/>
                <Input placeholder="Senha" secureTextEntry={true} style={{marginTop: 10, marginBottom: 30}} />                
            </Stack>

            <PressableButton
                onPress={() => navigation.navigate('Cadastro')}
                title='Entrar'
                style={{marginTop: '20px'}}
            />

            <View style={{flexDirection: 'row'}}>                
                    <SmallText>
                        Ainda não possui uma conta?
                    </SmallText>
                <TouchableOpacity onPress={()=>navigation.navigate('Cadastro')}> 
                    <TouchableText>
                        {` Cadastre-se`}
                    </TouchableText>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

export default Login

const styles = StyleSheet.create({
    input: {
       margin: 15,
       height: 40,
       color: 'red',
       background: 'red',
       backgroundColor: 'red',
       borderColor: '#7a42f4',
       borderWidth: 1
    },
 })