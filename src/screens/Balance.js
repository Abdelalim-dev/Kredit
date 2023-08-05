import React from 'react'
import { BigButton, SettingsButton } from '../components'
import styled from 'styled-components'
import { Caption as CaptionPaper, Headline, Title as TitlePaper } from 'react-native-paper'

import bannerImage from '../assets/images/undraw_balance.png'
import { SessionContext } from '../../App'

import { balanceUSSD } from 'src/utils/Constants'
import DialWrapper from '../utils/DialWrapper'

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

const Container = styled.View`
    margin-left: 16px;
    margin-right: 16px;
`
const Row = styled.View`
    flex-direction:row;
    justify-content: space-between;
    /* margin-left: 16px;
    margin-right: 16px; */
    margin-top: 16px;
`

const Column = styled.View`
    flex:1;
`

const VSpace = styled.View`
    width: 16px;
`

const Caption = styled(CaptionPaper)`
    text-align: center;
`

const Title = styled(TitlePaper)`
    color: ${({ disabled }) => disabled ? '#989898' : '#FFF'};
    text-align: center;
`

export default function Balance() {
    const SessionValue = React.useContext(SessionContext)
    const { session: { phone, operator, phone2, operator2 } } = SessionValue
    const disabled = !phone2

    const balanceFor = (operator) => {
        const USSD = balanceUSSD[operator]
        if (!USSD) {
            return alert("An error 111 has occured, please try again")
        }

        DialWrapper.dial(USSD)
    }

    return (
        <SafeArea>
            <Banner source={bannerImage} />
            <Container>
                <Description>{_('screens.balance.title')}</Description>

                <Row>
                    <BigButton
                        icon="sim"
                        value={operator}
                        subtitle="SIM1"
                        onPress={() => balanceFor(operator)} />

                    <VSpace />

                    <BigButton
                        disabled={disabled}
                        icon={disabled ? "sim-off" : "sim"}
                        value={operator2 || _('screens.balance.noSim')}
                        subtitle="SIM2"
                        onPress={() => balanceFor(operator2)} />
                </Row>

                <SettingsButton />
            </Container >
        </SafeArea>
    )
}