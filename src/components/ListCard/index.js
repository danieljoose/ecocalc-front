import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Card, FirstCard, Percentage, MonthText, PercentageText, MoneyText, CentsText, DespesasText, ArrowLeft } from "./style";
import UpArrow from "../../assets/up_arrow.svg"
import StaticSquare from "../../assets/rank-static.svg"
import DownArrow from "../../assets/down_arrow.svg"
import {monthYear} from '../../utils/monthYear'

const ListCard = ({dataMeses = [], selectedValue, navigation}) => {


    const getPercentageChange = (oldNumber, newNumber) => {

        if (!oldNumber) return 0
        var decreaseValue = oldNumber - newNumber || 0;

        const valor = (decreaseValue / oldNumber) * -100

        return valor.toFixed(0);
    }

    const navigateCard = (mes, id) => {
        if(id == 0){
            navigation.navigate('Residências', {
                mesSelected: mes,
                idSelected: null,
              })    
        } else if(id.substring(0,3) == 'res'){
            navigation.navigate('Residências', {
                mesSelected: mes,
                idSelected: Number(id.slice(4)) ,
              }) 
        } else if(selectedValue.substring(0,3) == 'pes'){
            navigation.navigate('Pessoas', {
                mesSelected: mes,
                idSelected: Number(id.slice(4)) ,
              })    
        }        
    }

    const renderFirstCard = () => {
        const mes = new Date().getMonth()+1
        const ano = new Date().getFullYear()

        const data = [...dataMeses].filter(e=> e.ano === ano && e.mes === mes)
        const dataAnterior = [...dataMeses].find(e=> e.ano < ano || e.mes < mes)

        const percentage = getPercentageChange(dataAnterior?.valorTotal, data[0]?.valorTotal)
        

        return (
            <FirstCard>
                    <MonthText>
                        {monthYear(new Date(), true)}
                    </MonthText>
                    
                    <ArrowLeft onPress={()=>navigateCard(0, selectedValue)}/>
                    <View style={{flexDirection: 'row'}}>
                       <MoneyText>
                            R$ {data.length > 0 ? parseInt(data[0]?.valorTotal) : '0'}
                        </MoneyText>
                        <CentsText>
                            ,{data.length > 0 ? data[0]?.valorTotal.toFixed(2).slice(-2) : '00'}
                        </CentsText> 
                    </View>

                    <DespesasText>
                        {data.length > 0 ? data[0]?.despesas.length : '0'} {data[0]?.despesas.length > 1 ? 'despesas' : 'despesa'} nesse mês
                    </DespesasText>
                    

                    <Percentage>
                        {percentage === 0 ? <StaticSquare/> : percentage > 0 ? <UpArrow/> : <DownArrow/>}
                        <PercentageText color={percentage}>
                            {percentage}%
                        </PercentageText>
                    </Percentage>  
                </FirstCard>
        )
    }

    const renderCard = (i, index) => {   
        const d = new Date();
        d.setMonth(d.getMonth() - index);                  

        const mes = d.getMonth()
        const ano = d.getFullYear()

        const data = [...dataMeses].filter(e=> e.ano === ano && e.mes === mes)
        const dataAnterior = [...dataMeses].find(e=> e.ano < ano || e.mes < mes)


        const percentage = getPercentageChange(dataAnterior?.valorTotal, data[0]?.valorTotal)
        return (
            <Card key={i}>
                <MonthText>
                    {monthYear(new Date(), true, -index - 1)}
                </MonthText>
                
                <ArrowLeft onPress={()=>navigateCard(i+1, selectedValue)}/>
                <View style={{flexDirection: 'row'}}>
                    <MoneyText>
                        R$ {data.length > 0 ? parseInt(data[0]?.valorTotal) : '0'}
                    </MoneyText>
                    <CentsText>
                        ,{data.length > 0 ? data[0]?.valorTotal.toFixed(2).slice(-2) : '00'}
                    </CentsText> 
                </View>

                <DespesasText>
                    {data.length > 0 ? data[0]?.despesas.length : '0'} {data[0]?.despesas.length > 1 ? 'despesas' : 'despesa'} nesse mês
                </DespesasText>
                

                <Percentage>
                    {percentage == 0 ? <StaticSquare/> : percentage > 0 ? <UpArrow/> : <DownArrow/>}
                    <PercentageText color={percentage}>
                        {percentage}%
                    </PercentageText>
                </Percentage> 
            </Card>
)
    }

    return(
        <ScrollView style={{ flex: 1, width: "100%"}}>
            <View style={{alignItems: 'center'}}>    
                {renderFirstCard()}

                {Array.from(Array(12).keys()).map((i, index)=> (
                   renderCard(i, index)
                ))}


                
            </View>
        </ScrollView>
        
    )
}

export default ListCard