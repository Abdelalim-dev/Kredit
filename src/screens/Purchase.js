import React, { useState, useRef } from 'react'
import { InputAccessoryView } from 'react-native';
import styled from 'styled-components'
import { Input, Button, OperatorMenu } from '../components'
import { Headline as H, FAB as FloatingButton } from 'react-native-paper'
import * as Linter from '../utils/Lint'

import bannerImage from '../assets/images/undraw_purchase.png'

const SafeArea = styled.SafeAreaView`
    flex:1;
    background-color: #FFF;
`

const ScrollView = styled.ScrollView`
`

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
    padding-top: 16px;
    margin-horizontal: 16px;
`

const Banner = styled.Image`
    min-height:300px;
    height:auto;
    width:100%;
    margin-horizontal:-16px;
`

const AccessoryContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 4px;
    background-color: #D1D4D9;
`

const Headline = styled(H)`
    text-align: center;
`

const ButtonStyled = styled(Button)`
    margin-top: 32px;
    margin-bottom: 16px;
`

const FAB = styled(FloatingButton)`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 16px;
`

const FIELD_AMOUNT = "amount"

export default function Purchase() {

    const [amount, setAmount] = useState("");
    const [operator, setOperator] = useState("");

    const amountRef = useRef()
    const opRef = useRef()

    const inputAccessoryViewID = 'someUniqueID';

    const purchase = () => {
        const isValid = validateForm()
        if (!isValid) return

        performPurchase()
    }

    const validateForm = () => {
        let isValid = amountRef.current.isValid(Linter.chargeAmountValidation())
        isValid = opRef.current.isValid(Linter.requiredValidation()) && isValid
        return isValid;
    }

    const performPurchase = () => {
        alert('Should start the purchase')
    }

    const onReturn = (field) => {
        switch (field) {
            case FIELD_AMOUNT:
                amountRef.current.blur()
                break
        }
    }

    const openScan = () => {
        alert('Open Scan screen')
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

    const renderFAB = () => <FAB icon="line-scan" onPress={() => openScan()} />

    return (
        <SafeArea>
            <KeyboardAvoidingView behavior="height">
                <Headline>{_('screens.purchase.title')}</Headline>
                <ScrollView >
                    <Banner resizeMode="cover" source={bannerImage} />

                    <Input
                        ref={amountRef}
                        keyboardType="number-pad"
                        label={`${_('screens.purchase.amountLabel')}`}
                        value={amount}
                        onChangeText={text => setAmount(text)}
                        params={{ icon: 'currency-ngn' }}
                        inputAccessoryViewID={inputAccessoryViewID}
                    />

                    <OperatorMenu ref={opRef} label={_('sim1')} onItemSelected={setOperator} />

                    <ButtonStyled mode="outlined" onPress={purchase}> {_('purchase')} </ButtonStyled>
                </ScrollView>
            </KeyboardAvoidingView>
            {renderFAB()}
            {inputAccessoryAmount()}
        </SafeArea >
    )
}