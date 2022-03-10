import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { InputStyled, HelperTextStyled } from './styles'


export default function Input(props) {
    const { errorMessage, hasErrors } = props;


    return (
        <View>
            <InputStyled
                mode='outlined'
                {...props}
            />
            <HelperTextStyled type="error" visible={hasErrors && hasErrors()}>
                {errorMessage || ""}
            </HelperTextStyled>
        </View>
    )
}