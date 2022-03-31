import React, { useState, useRef } from 'react'
import { InputAccessoryView, Linking } from 'react-native';
import { SessionContext } from '../../../App'
import { Input, Button } from '../../components'
import * as Linter from '../../utils/Lint'
import {
    SafeArea, ScrollView, KeyboardAvoidingView, Banner, AccessoryContainer,
    Headline, FAB,
} from './components.styles'
import { ROUTES } from '../../utils/Constants'
import { BANK_USSDS } from 'src/utils/Constants'

import bannerImage from 'src/assets/images/undraw_purchase.png'


const FIELD_AMOUNT = "amount"

export default function PurchaseScreen({ navigation }) {

    const { session: { operator, operator2 } } = React.useContext(SessionContext)
    const disabled = !operator2


    const [amount, setAmount] = useState("");

    const [fabOpen, setFabOpen] = useState({ open: false });

    const amountRef = useRef()
    const opRef = useRef()


    const inputAccessoryViewID = 'someUniqueID';

    const purchase = () => {

        if (!validateForm()) return

        performPurchase()
    }

    // TODO: Check if the bank name is set
    const validateForm = () => amountRef.current.isValid(Linter.chargeAmountValidation())

    const performPurchase = () => {
        // TODO: Get the user bank
        const USSD = BANK_USSDS["TEST"]
        Linking.openURL(`tel:*${USSD}*${amount}#`)
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

    const renderFAB = () => (operator2 && operator2 != operator) ? <FABGroup /> : <FABButton />

    const FABButton = () => <FAB icon="line-scan" onPress={() => openScan(operator)} />

    const FABGroup = () => {
        return <FAB.Group
            open={fabOpen.open}
            icon={fabOpen.open ? 'close' : 'line-scan'}
            actions={[
                { icon: 'phone-outline', label: operator2, onPress: () => openScan(operator2) },
                { icon: 'phone', label: operator, onPress: () => openScan(operator) },
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

                    <Button mode='outlined' icon="cash-register" onPress={() => purchase(operator)}
                        style={{ borderRadius: 75 }} contentStyle={{ height: 150 }}>
                        {_('purchase')}
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
            {renderFAB()}
            {inputAccessoryAmount()}
        </SafeArea >
    )
}