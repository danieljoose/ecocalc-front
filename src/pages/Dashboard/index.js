import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import auth from "../../services/auth"
import EcoCalc from "../../assets/ecocalc.svg";
import Pig from "../../assets/pig.svg";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import AsyncStorage from '@react-native-community/async-storage'
import AuthContext from '../../contexts/Auth';

const Dashboard = ({ navigation }) => {
    const { logout, user, signed, credentialsUser  } = useContext(AuthContext)
    const [selectedValue, setSelectedValue] = useState("java");

    useEffect(()=>{
        if(signed && !user.id){
            (async () => credentialsUser())()
        } else if (!signed && user.auth) {
            (async () => logout())()
        }
    })

    return (
        <View style={{alignItems: 'center', flex: 1, paddingHorizontal: 30 }}>
            <Subtitle style={{fontSize: 15, marginTop: 10}}>
                Visualize o total gasto em cada mês e quanto
                você poupou em relação ao mês anterior.
                Clique e acesse os detalhes de cada mês.</Subtitle>
                {/* <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker> */}

            <PressableButton
                onPress={async ()=> await logout()}
                title='Sair'
                style={{marginTop: '20px'}}
            />
        </View>
    )
}

export default Dashboard