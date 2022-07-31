import React, {useEffect} from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Card, FirstCard, Percentage, MonthText, NumText, MoneyText, CentsText, NumTitle, TotalText } from "./style";
import UpArrow from "../../assets/up_arrow.svg"
import StaticSquare from "../../assets/rank-static.svg"
import DownArrow from "../../assets/down_arrow.svg"
import {month} from '../../utils/monthYear'


const PessoaCard = ({data}) => {
    useEffect(()=>{
        console.log("OXE ", data)
    }, [data])

    return(  
        <Card style={{ flexDirection: 'row', padding: 15}}>
            <View style={{width: '60%'}}>
                <MonthText>
                    {data && `${month(data?.mes)}/${data?.ano}`}
                </MonthText>
                <TotalText>
                    Total gasto:
                </TotalText>
                <View style={{flexDirection: 'row'}}>
                    <MoneyText>
                        R$ {data?.valorTotal.toFixed(0)}
                    </MoneyText>
                    <CentsText>
                        ,{data?.valorTotal.toFixed(2).slice(-2)}
                    </CentsText> 
                    
                </View>
            </View>

            <View style={{width: '40%', alignItems: 'flex-end'}}>
                <NumTitle>
                    N° de despesas:                                  
                </NumTitle>
                <NumText>
                    {data?.despesas.length}
                </NumText>

                <NumTitle>
                    N° de pessoas:                                  
                </NumTitle>
                <NumText>
                    {data?.pessoas.length}
                </NumText>
            </View> 

            
        </Card>
    )
}

export default PessoaCard
