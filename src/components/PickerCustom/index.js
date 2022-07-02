import React, {useState} from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import colors from "../../style/colors";


const PickerCustom = ({ data, selectedValue, onChange, width, fonte, color }) => {
    return (
      <View style={{
        alignItems: "center",
        maxWidth: "100%",
        backgroundColor: color || 'white',
        marginVertical: 10,
        shadowColor: "#000",
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
          placeHolder="opa"
          style={{  
            width: width || '100%', 
            color: colors.thirdBlue,
            fontSize: 20
           }}
           mode="dropdown"
          onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
        >
            <Picker.Item style={{fontSize: fonte || 16}} label={'Selecione uma opção'} />
            {data.map((elem) =>(
                <Picker.Item style={{fontSize: fonte || 16}} label={elem.nome} value={elem.id} key={elem.id} />
            ))}
        </Picker>
      </View>
    );
}

export default PickerCustom