import React from 'react'
import { View, Text } from 'react-native'
import { InputStyled, HelperTextStyled } from './styles'
import { TextInput } from 'react-native-paper';


export default function Input(props) {

    const { icon, errorMessage } = props.params || {}
    return (
        <View>
            <InputStyled
                {...props}
                mode='outlined'
                // dense={true}
                autoCorrect={false}
                error={errorMessage != ""}
                left={icon && <TextInput.Icon name={icon} />}
            />
            <HelperTextStyled type="error" visible={errorMessage != null}>
                {errorMessage || ""}
            </HelperTextStyled>
        </View>
    )
}