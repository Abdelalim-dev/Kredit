import { View, Text, SafeAreaView, Button } from 'react-native'
import React, { useContext } from 'react'
import { SessionContext } from '../../App'

export default function Auth() {
    const session = useContext(SessionContext)


    const login = () => {
        session.changeSession(true)
    }

    return (
        <SafeAreaView>
            <Text>{session.isLoggedIn ? "IN" : "OUT"}</Text>
            <Button title="Login" onPress={login} />
        </SafeAreaView>
    )
}