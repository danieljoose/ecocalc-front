import React, { useState, useContext } from 'react'
import { View, Text } from "react-native";
import { useForm } from 'react-hook-form'
import IconDespesa from "../../assets/icon-despesa.svg";
import { Subtitle, TitleLight, SmallText, Title } from "../../style/texts"
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { PressableButton } from "../../style/button"
import { Input } from "../../components/Input"
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
    const { user, getId } = useContext(AuthContext)
    const { register, setValue, handleSubmit, watch } = useForm()

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

            <Stack style={{width: '90%'}}>
                <Input placeholder="Título" style={{marginTop: 25}} onChangeText={text => setValue('titulo', text)}/>
                <DatePickerCustom setValue={text => setValue('data', text)} placeholder="Data"/>
                <Input placeholder="Valor" style={{marginBottom: 30}} onChangeText={text => setValue('valor', text)}/>                
                <PickerCustom
                    selectedValue={selectedValue}
                    onChange={(e)=>{
                      setSelectedValue(e)
                      setValue('pessoaId', e)
                    }}
                    optionalLabel='Pessoa'
                    data={dataPessoas?.getPessoas}
                    fonte={14}
                    color="#AFE9DE"
                />   
            </Stack>


            <PressableButton
                    onPress={handleSubmit(onSubmit)}
                    title='Adicionar'                    
                />


        </View>
    )
}

export default DespesaPessoal