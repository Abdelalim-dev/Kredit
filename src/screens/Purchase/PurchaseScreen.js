import React, { useState, useRef } from 'react'
import { InputAccessoryView, Linking } from 'react-native';
import { SessionContext } from '../../../App'
import { Input, Button } from '../../components'
import * as Linter from '../../utils/Lint'
import {
    SafeArea, ScrollView, KeyboardAvoidingView, Banner, AccessoryContainer,
    Headline, FAB, SettingsButton
} from './components.styles'
import * as Components from './components.styles'
import { ROUTES } from '../../utils/Constants'
import { BANK_USSDS } from 'src/utils/Constants'

import bannerImage from 'src/assets/images/undraw_purchase.png'



const FIELD_AMOUNT = "amount"

export default function PurchaseScreen({ navigation }) {

    const { session: { phone2, operator, operator2, bank, bank2 } } = React.useContext(SessionContext)

    const [amount, setAmount] = useState("");

    const [fabOpen, setFabOpen] = useState({ open: false });

    const amountRef = useRef()


    const inputAccessoryViewID = 'someUniqueID';

    const purchase = (bank) => {

        if (!validateForm()) return

        performPurchase(bank)
    }

    const validateForm = () => amountRef.current.isValid(Linter.chargeAmountValidation())

    const performPurchase = (bank) => {
        const USSD = BANK_USSDS[bank]
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
        const { subtitle } = props;
        return <Components.Column>
            <Button contentStyle={{ height: 150 }} {...props}>
                <Components.Title disabled={props.disabled}>{props.value}</Components.Title>
            </Button>
            <Components.Caption>{subtitle}</Components.Caption>
        </Components.Column>
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

                    <Components.Row>
                        <BigButton
                            disabled={!bank}
                            icon="bank"
                            value={bank ? bank : _('misc.noBank')}
                            subtitle="SIM1"
                            onPress={() => purchase(bank)} />

                        <Components.VSpace />

                        <BigButton
                            disabled={!bank2}
                            icon={!phone2 ? "phone-off" : (!bank2 ? "bank-off" : "bank")}
                            value={!phone2 ? _('misc.noSim') : (!bank2 ? _('misc.noBank') : bank2)}
                            subtitle="SIM2"
                            onPress={() => purchase(bank2)} />
                    </Components.Row>

                    <SettingsButton />
                </ScrollView>
            </KeyboardAvoidingView>
            {renderFAB()}
            {inputAccessoryAmount()}
        </SafeArea >
    )
}