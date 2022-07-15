import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import IconAddPessoa from "../../assets/add-pessoa.svg";
import PickerCustom from '../../components/PickerCustom';
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import AuthContext from '../../contexts/Auth';

const ADD_PESSOA = gql`
  mutation($nome: String!, $sobrenome: String!, $residenciaId: ID, $usuarioId: ID!) {
    cadastrarPessoa(nome: $nome, sobrenome: $sobrenome, residenciaId: $residenciaId, usuarioId: $usuarioId) {
      id
      nome
    }
  }
`;

const GET_RESIDENCIA = gql`
  query($usuarioId: ID!) {
    getResidencias(usuarioId: $usuarioId) {
      id
      nome
    }
  }
`;

const AddPessoa = ({ navigation }) => {
    const { logout, user, signed, credentialsUser, getId  } = useContext(AuthContext)
    const { register, setValue, handleSubmit, watch } = useForm()
    const [selectedValue, setSelectedValue] = useState(null);

    const { data: dataResidencias, loading: loadingResidencias } = useQuery(GET_RESIDENCIA, {
      variables: {
        usuarioId: user.id
      },
      // onCompleted: (e)=>{
      //   // console.log(e.getResidencias[0]?.id)
      //   setSelectedValue(e.getResidencias[0]?.id)
      //   // console.log(selectedValue)
      // }
    })


    
    const [cadastrarPessoa, { loading }] = useMutation(ADD_PESSOA, {
        onError: (err) => {
            console.log(err)          
        },
        onCompleted: (e) => {
          navigation.navigate('AddPessoaSuccess')
        },
      });


    const onSubmit = async ({nome, sobrenome, residenciaId}) => {
        const usuarioId = await getId()
        cadastrarPessoa({
            variables: {
                nome,
                sobrenome,
                residenciaId,
                usuarioId
            }
        })
        console.log(residenciaId)
        // console.log(await auth.getId())
    }

    return (
        <View style={{alignItems: 'center', flex: 1, paddingHorizontal: 30 }}>

            <IconAddPessoa style={{marginTop: '10%'}}/>

            <Subtitle style={{fontSize: 15, marginTop: '10%'}}>
            Cadastre uma nova pessoa para gerenciar
            e visualizar seus gastos mensais.</Subtitle>           

            <Stack style={{width: '90%'}}>
                <Input placeholder="Nome" style={{marginTop: '15%'}} onChangeText={text => setValue('nome', text)}/>
                <Input placeholder="Sobrenome"  style={{marginTop: "3%"}} onChangeText={text => setValue('sobrenome', text)}/>
                {/* <Input placeholder="Residência (opcional)" secureTextEntry={true} style={{marginTop: "3%", marginBottom: '15%'}} onChangeText={text => setValue('residenciaId', text)}/>      */}
                <PickerCustom
                    selectedValue={selectedValue}
                    onChange={(e)=>{
                      setSelectedValue(e)
                      setValue('residenciaId', e)
                    }}
                    optionalLabel='Selecione uma residência (opcional)'
                    data={dataResidencias?.getResidencias}
                    fonte={14}
                    color="#AFE9DE"
                />           
            </Stack>
           

            <PressableButton
                onPress={handleSubmit(onSubmit)}
                title='Entrar'
                style={{marginTop: '10%'}}
            />
        </View>
    )
}

export default AddPessoa