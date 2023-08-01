import React, { useContext, useState, useEffect } from 'react'
import { InputAccessoryView, Keyboard } from 'react-native';
import styled from 'styled-components'
import { Divider, Caption, Headline } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { SessionContext } from '../../App'
import { Input, Button, Select } from '../components'
import { ScrollView } from '../components/styles'
import * as Linter from '../utils/Lint'
import { SessionPersistence } from '../services/persistence'
import { BANKS, OPERATORS } from 'src/utils/Constants'

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

const SaveButton = styled(Button)``

const FIELD_PHONE = "phone"
const FIELD_PHONE2 = "phone2"
const FIELD_BANK = "bank"

export default function Settings(props) {
    const { session, changeSession } = useContext(SessionContext)
    
    const [phone, setPhone] = useState(session.phone || "");
    const [selectedOp, setOp] = useState(session.operator || ""); // Operator
    const [phone2, setPhone2] = useState(session.phone2 || "");
    const [selectedOp2, setOp2] = useState(session.operator2 || "");
    const [bank, setBank] = useState(session.bank || "");
    const [bank2, setBank2] = useState(session.bank2 || "");

    const phoneRef = React.useRef()
    const opRef = React.useRef()
    const phone2Ref = React.useRef()
    const op2Ref = React.useRef()

    const inputAccessoryViewID = 'uniqueID';
    const inputAccessoryViewID2 = 'uniqueID2';

    const saveSettings = () => {
        const isValid = validateForm()
        if (!isValid) return

        performSaving()
    }

    const performSaving = () => {
        
        let sessionData = {
            phone: phone,
            operator: selectedOp,
            bank: bank,
            phone2: phone2,
            operator2: selectedOp2,
            bank2: bank2,
        }

        changeSession(sessionData)
        
        if (props.editing) {
            Toast.show({
                type: 'success',
                text1: _('screens.settings.saved'),
            });
        }
    }

    const validateForm = () => {
        let isValid = phoneRef.current.isValid(Linter.phoneValidation())
        isValid = opRef.current.isValid(Linter.requiredValidation()) && isValid
        isValid = phone2Ref.current.isValid(Linter.optionalPhoneValidation()) && isValid
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
                saveSettings()
                break
        }
    }

    const Header = (_props) => {
        if (props.editing)
            return <Headline style={{ textAlign: 'center' }} {..._props}>{_('screens.settings.title')}</Headline>
        else
            return <Image source={require('../assets/images/logo.png')} {..._props} />
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
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : "height"}>
                <ScrollView contentContainerStyle={{ paddingBottom: 16 }} keyboardShouldPersistTaps="handled">

                    <Header style={{ marginTop: 16 }} />

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

                    <Select ref={opRef} label={_('sim1')} value={selectedOp} onItemSelected={setOp} icon='sim' items={OPERATORS} />

                    <Select label={_('bank')} value={bank} onItemSelected={setBank} icon='bank' items={BANKS} />

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

                    <Select ref={op2Ref} dense={true} label={_('sim2')} value={selectedOp2} onItemSelected={setOp2} icon='sim' items={OPERATORS} />

                    <Select label={_('bank2')} value={bank2} onItemSelected={setBank2} icon='bank' dense={true} items={BANKS} />

                    <SaveButton onPress={saveSettings}> {_('screens.settings.save')} </SaveButton>

                    {__DEV__ && <Button mode="outlined" onPress={() => {
                        sessionValue.changeSession(null)
                    }}>Logout</Button>}
                </ScrollView>
            </KeyboardAvoidingView>
            {inputAccessoryPhone1()}
            {inputAccessoryPhone2()}
        </SafeArea>
    )
}