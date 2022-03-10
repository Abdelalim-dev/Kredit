import React from 'react'
import { Container, SafeAreaStyled } from './styles'

export default function SafeArea({ children }) {
    return (
        <SafeAreaStyled>
            <Container>
                {children}
            </Container>
        </SafeAreaStyled>
    )
}