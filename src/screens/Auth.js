import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { SessionContext } from '../../App'
import { Input, SafeArea, Button } from '../components'
import { ScrollView } from '../components/styles'
import { OperatorMenu } from '../components'
import { Divider, Caption } from 'react-native-paper';
import * as Linter from '../utils/Lint'
import { SessionPersistence } from '../services/persistence'
import { InputAccessoryView } from 'react-native';

const VerticalSpace = styled.View`
    margin-bottom: 16px;
`

const DoubleVerticalSpace = styled.View`
    margin-bottom: 32px;
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

const FIELD_PHONE = "phone"
const FIELD_IBAN = "iban"
const FIELD_PHONE2 = "phone2"
const FIELD_BANK = "bank"

export default function Auth() {
    const session = useContext(SessionContext)
    const [phone, setPhone] = useState("");
    const [selectedOp, setOp] = useState(""); // Operator
    const [phone2, setPhone2] = useState("");
    const [selectedOp2, setOp2] = useState("");
    const [iban, setIban] = useState("");
    const [bank, setBank] = useState("");

    const phoneRef = React.useRef()
    const opRef = React.useRef()
    const ibanRef = React.useRef()
    const phone2Ref = React.useRef()
    const op2Ref = React.useRef()
    const bankRef = React.useRef()

    const inputAccessoryViewID = 'uniqueID';
    const inputAccessoryViewID2 = 'uniqueID2';

    const register = () => {
        const isValid = validateForm()
        if (!isValid) return

        performLogin()
    }

    const performLogin = () => {
        let sessionData = {
            phone: phone,
            operator: selectedOp,
            iban: iban,
            bank: bank,
            phone2: phone2,
            operator2: selectedOp2,
        }
        SessionPersistence.save(sessionData)
        session.changeSession(true)
    }

    const validateForm = () => {
        let isValid = phoneRef.current.isValid(Linter.phoneValidation())
        isValid = opRef.current.isValid(Linter.requiredValidation()) && isValid
        isValid = ibanRef.current.isValid(Linter.ibanValidation()) && isValid

        // Initially undefined: Not rendered when accordion is contracted
        if (phone2Ref.current)
            isValid = phone2Ref.current.isValid(Linter.optionalPhoneValidation()) && isValid
        if (op2Ref.current)
            isValid = op2Ref.current.isValid(Linter.requiredIfValidation('phone2', phone2)) && isValid
        return isValid;
    }

    const onReturn = (field) => {
        switch (field) {
            case FIELD_PHONE:
                ibanRef.current.focus()
                break
            case FIELD_IBAN:
                phone2Ref.current.focus()
                break
            case FIELD_PHONE2:
                bankRef.current.focus()
                break
            case FIELD_BANK:
                register()
                break
        }
    }

    const inputAccessoryPhone1 = () => inputAccessoryView(inputAccessoryViewID, () => onReturn(FIELD_PHONE))
    const inputAccessoryPhone2 = () => inputAccessoryView(inputAccessoryViewID2, () => onReturn(FIELD_PHONE2))
    const inputAccessoryView = (inputID, onPress) => (
        Platform.OS == 'android' ? null :
            <InputAccessoryView nativeID={inputID}>
                <AccessoryContainer>
                    <Button mode="text" onPress={onPress}>{_('next')}</Button>
                </AccessoryContainer>
            </InputAccessoryView>
    )

    return (
        <SafeArea>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "position" : "height"}>
                <ScrollView keyboardShouldPersistTaps="handled">

                    <Image source={require('../assets/images/logo.png')} />

                    <VerticalSpace />

                    <Input
                        ref={phoneRef}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        autoComplete="tel"
                        onSubmitEditing={() => onReturn(FIELD_PHONE)}
                        label={`${_('phone1')} (${_('phoneHint')})`}
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        params={{ icon: 'phone' }}
                        inputAccessoryViewID={inputAccessoryViewID}
                    />

                    <OperatorMenu ref={opRef} label={_('sim1')} onItemSelected={setOp} />

                    <Input
                        ref={ibanRef}
                        returnKeyType="next"
                        onSubmitEditing={() => onReturn(FIELD_IBAN)}
                        label={_('iban')}
                        value={iban}
                        onChangeText={text => setIban(text)}
                        params={{ icon: 'bank' }}
                    />

                    <Caption>{_('additionalInfo')}</Caption>
                    <Divider />
                    <VerticalSpace />

                    <Input
                        ref={phone2Ref}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        onSubmitEditing={() => onReturn(FIELD_PHONE2)}
                        label={`${_('phone2')} (${_('phoneHint')})`}
                        value={phone2}
                        onChangeText={text => setPhone2(text)}
                        params={{ icon: 'phone' }}
                        dense={true}
                        inputAccessoryViewID={inputAccessoryViewID2}
                    />

                    <OperatorMenu ref={op2Ref} dense={true} label={_('sim2')} onItemSelected={setOp2} />

                    <Input
                        ref={bankRef}
                        returnKeyType="done"
                        onSubmitEditing={() => onReturn(FIELD_BANK)}
                        label={_('bank')}
                        value={bank}
                        onChangeText={text => setBank(text)}
                        params={{ icon: 'bank' }}
                        dense={true}
                    />

                    <Button onPress={register}> {_('login')} </Button>
                </ScrollView>
            </KeyboardAvoidingView>
            {inputAccessoryPhone1()}
            {inputAccessoryPhone2()}
        </SafeArea>
    )
}