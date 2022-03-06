import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { SessionContext } from '../../App'

export default function Scan() {

    const session = useContext(SessionContext)
    const logout = () => {
        session.changeSession(false)
    }

    return (
        <View>
            <Text>Scan</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    )
}