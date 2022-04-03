import React, { useState, useRef } from 'react'
import { InputAccessoryView, Linking } from 'react-native';
import { SessionContext } from '../../../App'
import { Input, Button, Select } from '../../components'
import * as Linter from '../../utils/Lint'
import {
    SafeArea, ScrollView, KeyboardAvoidingView, Banner, AccessoryContainer,
    Headline, FAB,
} from './components.styles'
import * as Components from './components.styles'
import { ROUTES } from '../../utils/Constants'
import { BANKS, BANK_USSDS } from 'src/utils/Constants'

import bannerImage from 'src/assets/images/undraw_purchase.png'


const FIELD_AMOUNT = "amount"

export default function PurchaseScreen({ navigation }) {

    const { session: { phone2, operator, operator2, bank, bank2 }, changeSession } = React.useContext(SessionContext)
    const disabled = !bank
    const disabled2 = !bank2


    const [amount, setAmount] = useState("");

    const [fabOpen, setFabOpen] = useState({ open: false });

    const amountRef = useRef()


    const inputAccessoryViewID = 'someUniqueID';

    const handleBankSelected = (bank) => {
        const newSession = JSON.parse(session)
        newSession.bank = bank
        changeSession(newSession)
    }

    const handleBank2Selected = (bank) => {
        const newSession = JSON.parse(session)
        newSession.bank2 = bank
        changeSession(newSession)
    }

    const purchase = () => {

        if (!validateForm()) return

        performPurchase()
    }

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

    const inputAccessoryAmount = () => inputAccessoryView(inputAccessoryViewID, () => onReturn(FIELD_AMOUNT))
    const inputAccessoryView = (inputID, onPress) => (
        Platform.OS == 'android' ? null :
            <InputAccessoryView nativeID={inputID}>
                <AccessoryContainer>
                    <Button mode="text" onPress={onPress}>{_('done')}</Button>
                </AccessoryContainer>
            </InputAccessoryView>
    )

    const openScan = (operator) => navigation.push(ROUTES.SCAN, { operator })

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

    const BigButton = (props) => {
        return (
            <Button style={{ justifyContent: 'center' }}
                contentStyle={{ height: 150 }} {...props}>
                {props.children}
            </Button>
        )
    }

    const ButtonToAddBank2 = () => !(phone2 && !bank2) ?
        <Components.Caption>{_('screens.purchase.noPhone')}</Components.Caption> :
        <Select
            customAnchor={<Components.Caption>{_('screens.purchase.addBank')}</Components.Caption>}
            onItemSelected={handleBank2Selected} icon='bank' items={BANKS} />


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

                    <Components.Row>
                        <Components.Column>
                            <BigButton disabled={disabled}
                                icon={disabled ? "bank-off" : "bank"}
                                onPress={() => purchase(bank)}>
                                <Components.Title disabled={disabled}>{bank || _('screens.purchase.noBank')}</Components.Title>
                            </BigButton>
                            {disabled && <Select
                                customAnchor={<Components.Caption>{_('screens.purchase.addBank')}</Components.Caption>}
                                onItemSelected={handleBankSelected} icon='bank' items={BANKS} />}
                        </Components.Column>

                        <Components.VSpace />

                        <Components.Column>
                            <BigButton
                                disabled={disabled2}
                                icon={disabled2 ? "bank-off" : "bank"}
                                onPress={() => balanceFor(bank2)}>
                                <Components.Title disabled={disabled2}>{bank2 || _('screens.purchase.noBank')}</Components.Title>
                            </BigButton>

                            <ButtonToAddBank2 />
                        </Components.Column>
                    </Components.Row>
                </ScrollView>
            </KeyboardAvoidingView>
            {renderFAB()}
            {inputAccessoryAmount()}
        </SafeArea >
    )
}