import React from "react";
import { View, Text } from "react-native";
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import IconDespesa from "../../assets/icon-despesa.svg";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";

const Despesa = () => {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 30 }}>
            <IconDespesa/>
            <Subtitle style={{fontSize: 15, marginVertical: 40}}>
            Cadastre uma nova despesa para fazer o gerenciamento de sua ecônomia mensalmente. Selecione se sua despesa a ser cadastrada é residêncial ou pessoal:</Subtitle>           

            <PressableButton
                title='Residêncial'
            />
           <PressableButton
                title='Pessoal'
                style={{marginTop: '10%'}}
            />
        </View>
    )
}

export default Despesa