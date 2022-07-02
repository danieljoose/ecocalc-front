import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import IconAddResidencia from "../../assets/add-residencia.svg";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import AuthContext from '../../contexts/Auth';

const ADD_RESIDENCIA = gql`
  mutation($nome: String!, $usuarioId: ID!) {
    cadastrarResidencia(nome: $nome, usuarioId: $usuarioId) {
      nome
    }
  }
`;


const AddResidencia = ({ navigation }) => {
    const { logout, user, signed, credentialsUser, getId  } = useContext(AuthContext)
    const { register, setValue, handleSubmit } = useForm()

    const [cadastrarResidencia, { loading }] = useMutation(ADD_RESIDENCIA, {
        onError: (err) => {
            console.log(err)          
        },
        onCompleted: async (e) => {
            console.log(e)
        },
      });

    const onSubmit = async ({nome}) => {
        const usuarioId = await getId()
        cadastrarResidencia({
            variables: {
                nome,
                usuarioId
            }
        })
        console.log(nome)
        // console.log(await auth.getId())
    }

    return (
        <View style={{alignItems: 'center', flex: 1, paddingHorizontal: 30 }}>

            <IconAddResidencia style={{marginTop: '10%'}}/>

            <Subtitle style={{fontSize: 15, marginTop: '10%'}}>
            Cadastre uma nova residência para gerenciar
            e visualizar os gastos mensais de cada imóvel
            e os gastos das pessoas cadastradas nela.</Subtitle>           

            <Stack style={{width: '90%'}}>
                <Input placeholder="Nome" style={{marginTop: '15%'}} defaultValue="" onChangeText={text => setValue('nome', text)}/>
                <Input placeholder="Pessoas (opcional)" secureTextEntry={true} style={{marginTop: "3%", marginBottom: '15%'}} onChangeText={text => setValue('senha', text)}/>                
            </Stack>
           

            <PressableButton
                onPress={handleSubmit(onSubmit)}
                title='Entrar'
                style={{marginTop: '10%'}}
            />
        </View>
    )
}

export default AddResidencia