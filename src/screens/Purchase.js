import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

const SafeArea = styled.SafeAreaView`
    flex:1;
`

export default function Purchase() {
    return (
        <SafeArea>
            <View>
                <Text>Purchase</Text>
            </View>
        </SafeArea>
    )
}