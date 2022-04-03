import React, { useContext, useState } from 'react'
import { InputAccessoryView, Keyboard } from 'react-native';
import styled from 'styled-components'
import { SessionContext } from '../../App'
import { Input, Button, OperatorMenu, Select } from '../components'
import { ScrollView } from '../components/styles'
import { Divider, Caption } from 'react-native-paper';
import * as Linter from '../utils/Lint'
import { SessionPersistence } from '../services/persistence'
import { BANKS } from 'src/utils/Constants'

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

const FIELD_PHONE = "phone"
const FIELD_PHONE2 = "phone2"
const FIELD_BANK = "bank"

export default function Auth() {
    const session = useContext(SessionContext)
    const [phone, setPhone] = useState("");
    const [selectedOp, setOp] = useState(""); // Operator
    const [phone2, setPhone2] = useState("");
    const [selectedOp2, setOp2] = useState("");
    const [bank, setBank] = useState("");
    const [bank2, setBank2] = useState("");

    const phoneRef = React.useRef()
    const opRef = React.useRef()
    const phone2Ref = React.useRef()
    const op2Ref = React.useRef()

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
            bank: bank,
            phone2: phone2,
            operator2: selectedOp2,
            bank2: bank2,
        }
        SessionPersistence.save(sessionData)
        session.changeSession(sessionData)
    }

    const validateForm = () => {
        let isValid = phoneRef.current.isValid(Linter.phoneValidation())
        isValid = opRef.current.isValid(Linter.requiredValidation()) && isValid
        isValid = phone2Ref.current.isValid(Linter.requiredIfValidation('bank2', bank2)) && isValid
        isValid = phone2Ref.current.isValid(Linter.requiredIfValidation('operator2', selectedOp2)) && isValid
        isValid = op2Ref.current.isValid(Linter.requiredIfValidation('phone2', phone2)) && isValid
        return isValid;
    }

    const onReturn = (field) => {
        switch (field) {
            case FIELD_PHONE:
                phone2Ref.current.focus()
                break
            case FIELD_PHONE2:
                Keyboard.dismiss()
                break
            case FIELD_BANK:
                register()
                break
        }
    }

    const inputAccessoryPhone1 = () => inputAccessoryView(inputAccessoryViewID, () => onReturn(FIELD_PHONE))
    const inputAccessoryPhone2 = () => inputAccessoryView(inputAccessoryViewID2, () => onReturn(FIELD_PHONE2), _('done'))
    const inputAccessoryView = (inputID, onPress, buttonTitle = _('next')) => (
        Platform.OS == 'android' ? null :
            <InputAccessoryView nativeID={inputID}>
                <AccessoryContainer>
                    <Button mode="text" onPress={onPress}>{buttonTitle}</Button>
                </AccessoryContainer>
            </InputAccessoryView>
    )

    return (
        <SafeArea>
            <KeyboardAvoidingView style={{ marginHorizontal: 16 }} behavior={Platform.OS == 'ios' ? "position" : "height"}>
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

                    <Select label={_('bank')} onItemSelected={setBank} icon='bank' items={BANKS} />

                    <Divider />
                    <VerticalSpace />
                    <Caption>{_('additionalInfo')}</Caption>

                    <Input
                        ref={phone2Ref}
                        keyboardType="phone-pad"
                        label={`${_('phone2')} (${_('phoneHint')})`}
                        value={phone2}
                        onChangeText={text => setPhone2(text)}
                        params={{ icon: 'phone' }}
                        inputAccessoryViewID={inputAccessoryViewID2}
                        dense={true}
                    />

                    <OperatorMenu ref={op2Ref} dense={true} label={_('sim2')} onItemSelected={setOp2} />

                    <Select label={_('bank2')} onItemSelected={setBank2} icon='bank' dense={true} items={BANKS} />

                    <Button onPress={register}> {_('login')} </Button>
                </ScrollView>
            </KeyboardAvoidingView>
            {inputAccessoryPhone1()}
            {inputAccessoryPhone2()}
        </SafeArea>
    )
}