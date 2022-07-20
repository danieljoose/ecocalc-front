import React, {useState, useE} from "react";
import { SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Text, View, Pressable } from 'react-native';
import formatDate from '../../utils/formatDate'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../../style/colors";
import { ButtonCustom } from "../../components/Input"

const DatePickerCustom = ({setValue, placeholder}) => {
    const [date, setDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (newDate) => {
        setDate(newDate)
        setValue(newDate)
        hideDatePicker();
    };

    return (
      <View style={{
        alignItems: "center",
        maxWidth: "100%",
        backgroundColor: '#AFE9DE',
        borderRadius: 40,
        marginTop: 10,
        marginBottom: 10
      }}>
        <ButtonCustom onPress={showDatePicker}>
            <Text style={{color: !date ? '#6c908a' : 'black'}}>{!date ? placeholder : formatDate(date)}</Text>
        </ButtonCustom>


        <DateTimePickerModal
            date={date || new Date()}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />

       
       
      </View>
    );
}

export default DatePickerCustom