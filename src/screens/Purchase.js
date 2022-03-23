import React, { useState, useRef } from 'react'
import { InputAccessoryView } from 'react-native';
import styled from 'styled-components'
import { Input, Button, OperatorMenu } from '../components'

import bannerImage from '../assets/images/undraw_purchase.png'

const SafeArea = styled.SafeAreaView`
    flex:1;
    background-color: #FFF;
    justify-content: center;
`

const VerticalSpace = styled.View`
    margin-bottom: 16px;
`

const Banner = styled.Image`
    height:50%;
    width:auto;
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
            <Banner source={bannerImage} />
            <VerticalSpace />
            <KeyboardAvoidingView style={{ marginHorizontal: 16 }} behavior={Platform.OS == 'ios' ? "position" : "height"}>


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