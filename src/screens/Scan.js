import React from 'react'
import { View, Text, Button } from 'react-native'
import styled from 'styled-components'

const SafeArea = styled.SafeAreaView`
    flex:1;
`

export default function Scan() {

    return (
        <SafeArea>
            <View>
                <Text>Scan</Text>
            </View>
        </SafeArea>
    )
}