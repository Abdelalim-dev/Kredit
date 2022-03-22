import React from 'react'
import { Button as PaperButton } from 'react-native-paper'
import styled from "styled-components";



const ButtonStyled = styled(PaperButton)`
    border-radius: 22px;
`

export default function Button(props) {

    return (
        <ButtonStyled
            style={{ borderRadius: 22 }}
            {...props}
            mode={props.mode || "contained"}
            contentStyle={{ height: 44 }}
        >
            {props.children}
        </ButtonStyled>
    )
}