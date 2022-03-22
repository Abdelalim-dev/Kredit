import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { SessionContext } from '../../App'
import { SafeArea } from '../components'

export default function Scan() {

    const session = useContext(SessionContext)
    const logout = () => {
        session.changeSession(false)
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