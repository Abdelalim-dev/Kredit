import React, { useState, useRef } from 'react'
import { InputAccessoryView } from 'react-native';
import { SessionContext } from '../../../App'
import { Input, Button, OperatorMenu } from '../../components'
import * as Linter from '../../utils/Lint'
import {
    SafeArea, ScrollView, KeyboardAvoidingView, Banner, AccessoryContainer,
    Headline, ActionButton, Portal, FAB,
} from './components.styles'
import { ROUTES } from '../../utils/Constants'

import bannerImage from 'src/assets/images/undraw_purchase.png'


const FIELD_AMOUNT = "amount"

export default function PurchaseScreen({ navigation }) {

    const { session } = React.useContext(SessionContext)

    const [amount, setAmount] = useState("");
    const [operator, setOperator] = useState("");

    const [fabOpen, setFabOpen] = useState({ open: false });

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

    const openScan = (operator) => {
        navigation.push(ROUTES.SCAN, { operator })
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

    const renderFAB = () => {
        const { operator, operator2 } = session

        return (operator2 && operator2 != operator) ? <FABGroup /> : <FABButton />
    }

    const FABButton = () => <FAB icon="line-scan" onPress={() => openScan(session.operator)} />

    const FABGroup = () => {
        return <FAB.Group
            open={fabOpen.open}
            icon={fabOpen.open ? 'close' : 'line-scan'}
            actions={[
                { icon: 'phone-outline', label: session.operator2, onPress: () => openScan(session.operator2) },
                { icon: 'phone', label: session.operator, onPress: () => openScan(session.operator) },
            ]}
            onStateChange={setFabOpen}
        />
    }

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

                    <ActionButton mode="outlined" onPress={purchase}> {_('purchase')} </ActionButton>
                </ScrollView>
            </KeyboardAvoidingView>
            {renderFAB()}
            {inputAccessoryAmount()}
        </SafeArea >
    )
}