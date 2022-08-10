import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import IconAddResidencia from "../../assets/add-residencia.svg";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import PickerCustom from '../../components/PickerCustom';
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import AuthContext from '../../contexts/Auth';
import * as yup from "yup";
import { Formik } from 'formik';

const ADD_RESIDENCIA = gql`
  mutation($nome: String!, $pessoaId: ID, $usuarioId: ID!) {
    cadastrarResidencia(nome: $nome, pessoaId: $pessoaId, usuarioId: $usuarioId) {
      nome
    }
  }
`;

const GET_PESSOAS = gql`
  query($usuarioId: ID!) {
    getPessoasSemResidencia(usuarioId: $usuarioId) {
        id
        nome
        sobrenome
    }
  }
`

const AddResidencia = ({ navigation }) => {
    const { logout, user, signed, credentialsUser, getId  } = useContext(AuthContext)
    const { register, setValue, handleSubmit } = useForm()
    const [selectedValue, setSelectedValue] = useState(null);

    const validation = yup
        .object({
            nome: yup
            .string()
            .required('Informe um nome para sua residência'),
            pessoaId: yup.string().notRequired(),   
            
        })



    const [cadastrarResidencia, { loading }] = useMutation(ADD_RESIDENCIA, {
        onError: (err) => {
            console.log(err)          
        },
        onCompleted: async (e) => {
            refetch()
            navigation.navigate('Adicionar residência ')
        },
      });

    const {data: dataPessoas, loading: loadingPessoas, refetch} = useQuery(GET_PESSOAS, {
        variables: {
            usuarioId: user.id
        }
    })

    useEffect(()=>{
        refetch()
    }, [])

    const onSubmit = async ({nome, pessoaId}) => {
        const usuarioId = await getId()
        cadastrarResidencia({
            variables: {
                nome,
                pessoaId,
                usuarioId
            }
        })
        // console.log(await auth.getId())
    }

    return (
        <View style={{alignItems: 'center', flex: 1, paddingHorizontal: 30 }}>

            <IconAddResidencia style={{marginTop: '10%'}}/>

            <Subtitle style={{fontSize: 15, marginTop: '10%'}}>
            Cadastre uma nova residência para gerenciar
            e visualizar os gastos mensais de cada imóvel
            e os gastos das pessoas cadastradas nela.</Subtitle>           

            <Formik
                initialValues={{ nome: '', pessoaId: '' }}
                onSubmit={values => onSubmit(values)}
                validationSchema={validation}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                     <>
                        <Stack style={{width: '90%'}}>
                            <Input placeholder="Nome" style={{marginTop: '15%'}} defaultValue="" onChangeText={text => setFieldValue('nome', text)}/>
                            {errors.nome && touched.nome ? (
                                <Text style={[styles.errors]}>{errors.nome}</Text>
                            ) : null}
                            <PickerCustom
                                selectedValue={selectedValue}
                                onChange={(e)=>{
                                setSelectedValue(e)
                                setFieldValue('pessoaId', e)
                                }}
                                optionalLabel='Selecione uma pessoa (opcional)'
                                data={dataPessoas?.getPessoasSemResidencia}
                                fonte={14}
                                color="#AFE9DE"
                            />       
                        </Stack>
                    

                        <PressableButton
                            onPress={handleSubmit}
                            title='Cadastrar'
                            style={{marginTop: '10%'}}
                        />
                    </>
                )}
                </Formik>
        </View>
    )
}

export default AddResidencia

const styles = StyleSheet.create({
    errors: {
        marginLeft: 15,
        marginBottom: 15,
        color: 'red',
        fontSize: 11,
        fontFamily: "Montserrat-Medium"
    },

 })