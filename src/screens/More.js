import React, { useContext } from 'react'
import styled from 'styled-components'
import { SessionContext } from '../../App'
import { SessionPersistence } from '../services/persistence'
import { List } from 'react-native-paper';

import { Button } from 'src/components'
import { ThemeDanger } from '../theme'

const SafeArea = styled.SafeAreaView`
    flex:1;
    background-color: #FFF;
`

const Container = styled.View`
    flex:1;
    flex-direction: column-reverse;
    padding: 16px;
`

const Image = styled.Image`
    align-self: center;
`
const Text = styled.Text`
`

const Item = styled(List.Item)`
    background-color: #fdfdfd;
    padding-left: 16px;
    padding-right: 16px;
    border-bottom-color: #f0f0f0;
    border-bottom-width: 1px;
`

const ButtonStyled = styled(Button)`
`

export default function More() {

    const sessionValue = useContext(SessionContext)
    const logout = () => {
        SessionPersistence.remove()
        sessionValue.changeSession(null)
    }

    const { session: { phone, operator, bank, phone2, operator2, bank2 } } = sessionValue
    return (
        <SafeArea>
            <Image source={require('../assets/images/logo.png')} />

            <Item
                title={phone}
                description={_('screens.more.phone')}
                left={props => <List.Icon {...props} icon="phone-outline" />}
            />
            <Item
                title={operator}
                description="SIM 1"
                left={props => <List.Icon {...props} icon="sim-outline" />}
            />

            <Item
                title={bank || '-'}
                description={_('bank')}
                left={props => <List.Icon {...props} icon="bank" />}
            />

            <Item
                title={phone2 || '-'}
                description={_('screens.more.phone2')}
                left={props => <List.Icon {...props} icon="phone-outline" />}
            />
            <Item
                title={operator2 || '-'}
                description="SIM 2"
                left={props => <List.Icon {...props} icon="sim-outline" />}
            />

            <Item
                title={bank2 || '-'}
                description={_('bank2')}
                left={props => <List.Icon {...props} icon="bank" />}
            />

            <Container>
                <ButtonStyled mode="outlined" theme={ThemeDanger} onPress={logout}>
                    Logout
                </ButtonStyled>
            </Container>
        </SafeArea>
    )
}