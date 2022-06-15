import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { gql, useQuery, useMutation } from "@apollo/client";
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import EcoCalc from "../../assets/ecocalc.svg";
import Pig from "../../assets/pig.svg";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"

const GET_USUARIO_BY_ID = gql`
  query($id: ID!) {
    getUsuarioById(id: $id) {
        id
        nome
    }
  }
`;

const CADASTRAR_USUARIO = gql`
  mutation($nome: String!, $sobrenome: String!, $email: String!, $senha: String!) {
    cadastrarUsuario(nome: $nome, sobrenome: $sobrenome, email: $email, senha: $senha) {
        id
        nome
        email
    }
  }
`;


const Cadastro = ({ navigation }) =>{
    const { register, setValue, handleSubmit } = useForm()


    const {data: dataUser, loading: loadingUser } = useQuery(GET_USUARIO_BY_ID, {
        variables: {
            id: 1
        },
        onCompleted: (e) => {
            console.log(e)
        },
        onError: (e)=>{
            console.log('oaoaa')
            console.log(e)
        }
    })

    const [cadastrarUsuario] = useMutation(CADASTRAR_USUARIO, {
        onCompleted: (e) =>{
            console.log(e)
        }
    })

    const onSubmit = ({nome, sobrenome, email, senha}) => {
        cadastrarUsuario({
            variables: {
                nome,
                sobrenome,
                email,
                senha
            }
        })
    }
    
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <EcoCalc style={{marginBottom: 60}}/>
            <Subtitle style={{maxWidth: '80%', textAlign: 'center'}}>
                {`Preencha os dados abaixo para\ncriar uma conta no EcoCalc`}
            </Subtitle>

            <Stack style={{width: '75%'}}>
                <Input placeholder="Nome" style={{marginTop: 30}} onChangeText={text => setValue('nome', text)}/>
                <Input placeholder="Sobrenome" style={{marginTop: 10, marginBottom: 30}} onChangeText={text => setValue('sobrenome', text)}/>     
                <Input placeholder="E-mail" style={{marginTop: 10, marginBottom: 30}} onChangeText={text => setValue('email', text)}/> 
                <Input placeholder="Senha" secureTextEntry={true} style={{marginTop: 10, marginBottom: 30}} onChangeText={text => setValue('senha', text)}/>            
            </Stack>

            <PressableButton
                onPress={handleSubmit(onSubmit)}
                title='Cadastrar'
                style={{marginTop: '20px'}}
            />

            <View style={{flexDirection: 'row'}}>                
                    <SmallText>
                        Já possui uma conta?
                    </SmallText>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}> 
                    <TouchableText>
                        {` Faça seu login`}
                    </TouchableText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Cadastro