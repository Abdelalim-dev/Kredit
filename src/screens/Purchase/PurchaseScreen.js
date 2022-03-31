import React, { useState, useRef } from 'react'
import { InputAccessoryView } from 'react-native';
import { SessionContext } from '../../../App'
import { Input, Button, OperatorMenu } from '../../components'
import * as Linter from '../../utils/Lint'
import {
    SafeArea, ScrollView, KeyboardAvoidingView, Banner, AccessoryContainer,
    Headline, ActionButton, Portal, FAB,
} from './components.styles'
import * as Components from './components.styles'
import { ROUTES } from '../../utils/Constants'

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

    const purchase = (operatorNetwork) => {

        if (!validateForm()) return

        performPurchase(operatorNetwork)
    }

    const validateForm = () => amountRef.current.isValid(Linter.chargeAmountValidation())

    const performPurchase = (operatorNetwork) => {
        alert('Should start the purchase: ' + operatorNetwork)
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

    const BigButton = (props) => {
        return (
            <Button style={{ justifyContent: 'center' }}
                contentStyle={{ height: 150 }} {...props}>
                {props.children}
            </Button>
        )
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
                        <Components.Column>
                            <BigButton icon="sim" onPress={() => purchase(operator)}>
                                <Components.Title>{operator}</Components.Title>
                            </BigButton>
                            <Components.Description>SIM1</Components.Description>
                        </Components.Column>

                        <Components.VSpace />

                        <Components.Column>
                            <BigButton icon={disabled ? "sim-off" : "sim"} {...{ disabled }} onPress={() => purchase(operator2)}>
                                <Components.Title {...{ disabled }}>{operator2 || _('misc.noSim')}</Components.Title>
                            </BigButton>
                            <Components.Description>SIM2</Components.Description>
                        </Components.Column>
                    </Components.Row>
                </ScrollView>
            </KeyboardAvoidingView>
            {renderFAB()}
            {inputAccessoryAmount()}
        </SafeArea >
    )
}