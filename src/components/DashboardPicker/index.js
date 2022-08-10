import React, {useState, useContext, useEffect} from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import colors from "../../style/colors";
import AuthContext from '../../contexts/Auth';


const GET_PESSOAS = gql`
    query($usuarioId: ID!) {
        getPessoas(usuarioId: $usuarioId) {
            id
            nome
        }
    }
`
const GET_RESIDENCIAS = gql`
    query($usuarioId: ID!) {
        getResidencias(usuarioId: $usuarioId) {
            id
            nome
        }
    }
`


const DashboardCustom = ({ data, selectedValue, onChange, width, fonte, color, optionalLabel }) => {
    const { user, getId } = useContext(AuthContext)

    const {data: dataResidencias, loading: loadingResidencias, refetch: refetchResidencia} = useQuery(GET_RESIDENCIAS, {
        variables: {
            usuarioId: user.id
            },
    })

    const {data: dataPessoas, loading: loadingPessoas, refetch: refetchPessoas} = useQuery(GET_PESSOAS, {
        variables: {
            usuarioId: user.id
          },
    })

    useEffect(()=>{
        refetchPessoas()
        refetchResidencia()
    }, [])
    
    return (
      <View style={{
        alignItems: "center",
        maxWidth: "100%",
        backgroundColor: color || 'white',
        marginVertical: 10,
        shadowColor: color ? "#fff" : "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.88,
        shadowRadius: 16.00,
        borderRadius: 40,

        elevation: 29,
        fontSize: 10
      }}>
        <Picker
          selectedValue={selectedValue}
          style={{  
            width: width || 200, 
            height: 14,
            color: colors.thirdBlue,
            fontSize: 20,
            fontFamily: "Montserrat-Medium",
            marginLeft: 5
           }}
           mode="dropdown"
          onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
        >
            <Picker.Item 
                style={{fontSize: fonte || 16, color: selectedValue !== 0 ? colors.thirdBlue : colors.firstBlue}} 
                label='Despesas Totais'
                value={0}
                key={0} />
            <Picker.Item 
                style={{fontSize: fonte || 12, color: 'orange'}} 
                enabled={false} 
                label="Residências" 
                value={null}/> 
            {dataResidencias?.getResidencias ? dataResidencias?.getResidencias.map((elem) =>(
                <Picker.Item 
                    style={{fontSize: fonte || 16, color: selectedValue !== `res-${elem.id}` ? colors.thirdBlue : colors.firstBlue}} 
                    label={elem.nome} 
                    value={`res-${elem.id}`} 
                    key={`res-${elem.id}`} />
            )): null}
            <Picker.Item 
                style={{fontSize: fonte || 12, color: 'orange'}} 
                enabled={false} 
                label="Pessoas" 
                value={null}/> 
            {dataPessoas?.getPessoas ? dataPessoas?.getPessoas.map((elem) =>(
                <Picker.Item 
                    style={{fontSize: fonte || 16, color: selectedValue !== `pes-${elem.id}` ? colors.thirdBlue : colors.firstBlue}} 
                    label={elem.nome} 
                    value={`pes-${elem.id}`} 
                    key={`pes-${elem.id}`} />
            )): null}
        </Picker>
      </View>
    );
}

export default DashboardCustom