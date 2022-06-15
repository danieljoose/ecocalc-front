import React from 'react';
import styled from 'styled-components/native';
import colors from './colors'
const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 5px;
  width: 120px;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: ${props => `${props.height ?? 46}px;`}
  width: ${props => `${props.width ?? 300}px;`}
  border-radius: 10px;
  
  background-color: ${props => 
    props.variant === "delete" ? colors.red : 
    props.variant === "secondary" ? colors.orange :
    props.variant === "third" ? colors.secondBlue : colors.firstBlue};
  
`;
const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${props =>
    props.variant === "secondary" ? "#4F4F4F" : 'white'}
`;

export const PressableButton = ({ onPress, variant, title, height, width, disabled }) => (
  <ButtonContainer onPress={onPress} variant={variant} height={height} disabled={disabled} width={width}>
    <ButtonText variant={variant}>{title}</ButtonText>
  </ButtonContainer>
);
