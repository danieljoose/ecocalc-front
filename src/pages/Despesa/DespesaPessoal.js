import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { useForm } from 'react-hook-form'
import IconDespesa from "../../assets/icon-despesa.svg";
import { Subtitle, TitleLight, SmallText, Title } from "../../style/texts"
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { PressableButton } from "../../style/button"
import { Input } from "../../components/Input"
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { despesaPessoaValidation } from './validation';
import { Formik } from 'formik';
import DatePickerCustom from '../../components/DatePicker';
import PickerCustom from '../../components/PickerCustom';
import AuthContext from '../../contexts/Auth';


const GET_PESSOAS = gql`
    query($usuarioId: ID!) {
        getPessoas(usuarioId: $usuarioId) {
            id
            nome
        }
    }
`


const ADD_DESPESA = gql`
    mutation($titulo: String!, $data: DateTime!, $valor: BigDecimal!, $residenciaId: ID, $pessoaId: ID, $usuarioId: ID!) {
        cadastrarDespesa(titulo: $titulo, data: $data, valor: $valor, residenciaId: $residenciaId, pessoaId: $pessoaId, usuarioId: $usuarioId) {
            id
            titulo
            valor
            data
        }
    }
`

const DespesaPessoal = ({navigation}) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [valor, setValor] = useState()
    const { user, getId } = useContext(AuthContext)
    const { register, setValue, handleSubmit, watch } = useForm()

    const moneyMask = createNumberMask({
        prefix: ['R', '$', ' '],
        delimiter: '.',
        separator: ',',
        precision: 2,
      })
      

    const {data: dataPessoas, loading: loadingPessoas} = useQuery(GET_PESSOAS, {
        variables: {
            usuarioId: user.id
          },
    })

    const [addDespesa, { data: dataAddDespesa, loading: loadingAddDespesa }] = useMutation(ADD_DESPESA, {
        onCompleted: (e) => {
            navigation.navigate('AddDespesaSuccess')
        },
        onError: (e) =>{
            console.log(e)
        }
    })


    const onSubmit = async ({titulo, data, valor, pessoaId}) => {
        const usuarioId = await getId()
        addDespesa({
            variables: {
                titulo,
                data,
                valor,
                pessoaId,
                usuarioId
            }
        })
    }

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 30 }}>
            <IconDespesa/>
            <Subtitle style={{fontSize: 15, marginVertical: 25}}>
            Agora informe os dados da despesa para inserir no ela e calcular-mos seus gastos atuais.</Subtitle>

            <TitleLight>
                Pessoal
            </TitleLight>

            <Formik
                initialValues={{ titulo: '', data: '', valor: '', pessoaId: '' }}
                onSubmit={values => onSubmit(values)}
                validationSchema={despesaPessoaValidation}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <>
                    <Stack style={{width: '90%'}}>
                        <Input placeholder="Título" style={{marginTop: 25}} onChangeText={text => setFieldValue('titulo', text)}/>
                        {errors.titulo && touched.titulo ? (
                                <Text style={styles.errors}>{errors.titulo}</Text>
                            ) : null}
                        <DatePickerCustom setValue={text => setFieldValue('data', text)} placeholder="Data"/>
                        {errors.data && touched.data ? (
                                <Text style={[styles.errors]}>{errors.data}</Text>
                            ) : null}
                        <MaskInput
                            style={{backgroundColor: '#AFE9DE',fontFamily: 'Montserrat-Medium', borderRadius: 30, paddingLeft: 20, marginTop: 10}}
                            value={valor}
                            mask={moneyMask}
                            onChangeText={(masked, unmasked) => {
                                setValor(unmasked)
                                setFieldValue('valor', masked.replace('.', '').replace(',', '.').replace('R$ ', ''))
                            }}
                            />        
                        {errors.valor && touched.valor ? (
                            <Text style={[styles.errors, {marginBottom: 10}]}>{errors.valor}</Text>
                        ) : null}        
                        <PickerCustom
                            selectedValue={selectedValue}
                            onChange={(e)=>{
                            setSelectedValue(e)
                            setFieldValue('pessoaId', e)
                            }}
                            optionalLabel='Pessoa'
                            data={dataPessoas?.getPessoas}
                            fonte={14}
                            color="#AFE9DE"
                        />   
                         {errors.pessoaId && touched.pessoaId ? (
                                <Text style={[styles.errors, {marginTop: -10}]}>{errors.pessoaId}</Text>
                            ) : null}
                    </Stack>


                    <PressableButton
                            onPress={handleSubmit}
                            title='Adicionar'                    
                        />
                    </>
                )}
                </Formik>



        </View>
    )
}

export default DespesaPessoal

const styles = StyleSheet.create({
    errors: {
        marginLeft: 15,
        marginBottom: 15,
        color: 'red',
        fontSize: 11,
        fontFamily: "Montserrat-Medium"
    },

 })