import styled from 'styled-components/native';
import colors from '../../style/colors';
import {Text, View} from 'react-native';
import Arrow from "../../assets/arrow_left.svg"


export const Subtitle = styled.Text`
    &&{
        font-family: Montserrat-Medium;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        color: #557D76;
        text-align: center;
    }
`;

export const ArrowLeft = styled(Arrow)`
    position: absolute;
    margin-right: 15px;
    margin-top: 15px;
    right: 0;
`

export const Card = styled.View`
    background: ${colors.firstBlue};
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
`

export const FirstCard = styled.View`
    background: ${colors.thirdBlue};
    width: 100%;
    height: 120px;
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    
`

export const Percentage = styled.View`
    background: white;
    max-width: 100px;
    min-width: 72px;
    height: 32px;
    border-radius: 10px;
    margin-bottom: 15px;
    margin-right: 15px;
    position: absolute;
    padding-right: 2px;
    bottom: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`
export const PercentageText = styled.Text`
    font-family: Montserrat-Bold;
    font-size: 16px;
    font-style: normal;
    color: ${props =>
        props.color == 0 ? '#bababa' : props.color > 0 ? colors.red : colors.green}
    margin-left: ${props => props.color < 10 && props.color > -9 ? '7px' : '1px'}
`

export const MoneyText = styled.Text`
    font-family: Montserrat-Bold;
    font-size: 30px;
    font-style: normal;
    color: white;
`
export const CentsText = styled.Text`
    font-family: Montserrat-Bold;
    font-size: 17px;
    font-style: normal;
    margin-top: 14px;
    color: white;
`
export const DespesasText = styled.Text`
    font-family: Montserrat-Regular;
    font-size: 13px;
    font-style: normal;
    margin-top: 5px;
    color: white;
`

export const MonthText = styled.Text`
    font-family: Montserrat-Bold;
    font-size: 13px;
    font-style: normal;
    color: white;
`

export const TotalText = styled.Text`
    margin-top: 15px;
    font-family: Montserrat-Medium;
    font-size: 11px;
    font-style: normal;
    color: white;
`

export const NumText = styled.Text`
    font-family: Montserrat-Medium;
    font-size: 20px;
    font-style: normal;
    color: white;
`

export const NumTitle = styled.Text`
    font-family: Montserrat-Medium;
    font-size: 12px;
    font-style: normal;
    color: white;
`