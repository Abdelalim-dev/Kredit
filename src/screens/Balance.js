import React from 'react'
import { Button } from '../components'
import styled from 'styled-components'
import { Paragraph, Headline } from 'react-native-paper'

import bannerImage from '../assets/images/undraw_balance.png'

const SafeArea = styled.SafeAreaView`
    flex:1;
    background-color: #FFF;
    justify-content: center;
`

const Description = styled(Headline)`
    text-align: center;
    margin: 16px;
`

const Banner = styled.Image`
    height:50%;
    width:auto;
`

const Row = styled.View`
    flex-direction:row;
    justify-content: space-between;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 16px;
`

const BigButton = styled(Button)`
    height: 150px;
    width: 48%;
    justify-content: center;
`

export default function Balance() {
    return (
        <SafeArea>
            <Banner source={bannerImage} />

            <Description>{_('screens.balance.title')}</Description>

            <Row>
                <BigButton>Sim 1</BigButton>
                <BigButton disabled>Sim 2</BigButton>
            </Row>
        </SafeArea>
    )
}