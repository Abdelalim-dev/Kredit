import React from 'react'
import styled from "styled-components";

const SafeAreaStyled = styled.SafeAreaView`
    flex: 1;
`

export default function SafeArea(props) {
    const { children } = props
    return (
        <SafeAreaStyled {...props} >
            {children}
        </SafeAreaStyled>
    )
}