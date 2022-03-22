import React from 'react'
import { Button } from '../components'
import styled from 'styled-components'
import { Caption as CaptionPaper, Headline, Title as TitlePaper } from 'react-native-paper'

import bannerImage from '../assets/images/undraw_balance.png'
import { SessionContext } from '../../App'

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

const Column = styled.View`
    align-items: center;
    justify-content: center;
`

const VSpace = styled.View`
    width: 16px;
`

const Caption = styled(CaptionPaper)`
    color: ${({ disabled }) => disabled ? '#989898' : '#FFF'};
    text-align: center;
`

const Title = styled(TitlePaper)`
    color: ${({ disabled }) => disabled ? '#989898' : '#FFF'};
    text-align: center;
`

const BigButton = (props) => {
    return (
        <Button style={{ flex: 1, justifyContent: 'center' }}
            contentStyle={{ height: 150 }} {...props}>
            {props.children}
        </Button>
    )
}

export default function Balance() {
    const SessionValue = React.useContext(SessionContext)
    const { session: { phone, operator, phone2, operator2 } } = SessionValue
    const disabled = !phone2

    return (
        <SafeArea>
            <Banner source={bannerImage} />

            <Description>{_('screens.balance.title')}</Description>

            <Row>
                <BigButton>
                    <Column>
                        <Caption>SIM1</Caption>
                        <Title>{operator}</Title>
                    </Column>
                </BigButton>

                <VSpace />

                <BigButton {...{ disabled }}>
                    <Column>
                        <Caption {...{ disabled }}>SIM2</Caption>
                        {!!operator2 && <Title {...{ disabled }}>{operator2}</Title>}
                    </Column>
                </BigButton>
            </Row>
        </SafeArea>
    )
}