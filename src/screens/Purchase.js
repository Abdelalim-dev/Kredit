import React, { useState, useRef } from 'react'
import { InputAccessoryView } from 'react-native';
import styled from 'styled-components'
import { Input, Button, OperatorMenu } from '../components'

const SafeArea = styled.SafeAreaView`
    flex:1;
`

const VerticalSpace = styled.View`
    margin-bottom: 16px;
`

const Image = styled.Image`
    align-self: center;
`

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
`

const AccessoryContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 4px;
    background-color: #D1D4D9;
`

const FIELD_AMOUNT = "amount"

export default function Purchase() {

    const [amount, setAmount] = useState(0);
    const [operator, setOperator] = useState("");

    const amountRef = useRef()
    const opRef = useRef() // TODO: Remove if not used

    const inputAccessoryViewID = 'someUniqueID';

    const purchase = () => {
        // TODO:
    }

    const onReturn = (field) => {
        switch (field) {
            case FIELD_AMOUNT:
                amountRef.current.blur()
                break
        }
    }

    const inputAccessoryAmount = () => inputAccessoryView(inputAccessoryViewID, () => onReturn(FIELD_AMOUNT))
    const inputAccessoryView = (inputID, onPress) => (
        Platform.OS == 'android' ? null :
            <InputAccessoryView nativeID={inputID}>
                <AccessoryContainer>
                    <Button mode="text" onPress={onPress}>{_('done')}</Button>
                </AccessoryContainer>
            </InputAccessoryView>
    )

    return (
        <SafeArea>
            <KeyboardAvoidingView style={{ marginHorizontal: 16 }} behavior={Platform.OS == 'ios' ? "position" : "height"}>

                {/* TODO: Add some animation here... */}
                <Image source={require('../assets/images/logo.png')} />
                <VerticalSpace />

                <Input
                    ref={amountRef}
                    keyboardType="number-pad"
                    label={`${_('screens.purchase.amountLabel')}`}
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    params={{ icon: 'currency-usd' }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />

                <OperatorMenu ref={opRef} label={_('sim1')} onItemSelected={setOperator} />

                <Button onPress={purchase}> {_('purchase')} </Button>
            </KeyboardAvoidingView>
            {inputAccessoryAmount()}
        </SafeArea>
    )
}