import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import styled from 'styled-components'
import { SessionContext } from '../../App'
import { SessionPersistence } from '../services/persistence'

const SafeArea = styled.SafeAreaView`
    flex:1;
`

export default function Scan() {

    const sessionValue = useContext(SessionContext)
    const logout = () => {
        SessionPersistence.remove()
        sessionValue.changeSession(null)
    }

    return (
        <SafeArea>
            <View>
                <Text>Scan</Text>
                <Button title="Logout" onPress={logout} />
            </View>
        </SafeArea>
    )
}