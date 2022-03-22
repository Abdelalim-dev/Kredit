import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { SessionContext } from '../../App'
import { SafeArea } from '../components'
import { SessionPersistence } from '../services/persistence'

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