import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { SessionContext } from '../../App'
import { Input, SafeArea, Button } from '../components'
import { ScrollView } from '../components/styles'
import { OperatorMenu } from '../components'
import { List, Dialog, Portal, Paragraph } from 'react-native-paper';
import * as Linter from '../utils/Lint'
import { SessionPersistence } from '../services/persistence'

const VerticalSpace = styled.View`
    margin-bottom: 16px;
`

const Image = styled.Image`
    align-self: center;
`

export default function Auth() {
    const session = useContext(SessionContext)
    const [phone, setPhone] = useState("");
    const [selectedOp, setOp] = useState(""); // Operator
    const [phone2, setPhone2] = useState("");
    const [selectedOp2, setOp2] = useState("");
    const [iban, setIban] = useState("");
    const [bank, setBank] = useState("");

    const [errDlgVisible, setErrDlgVisible] = useState(false);

    React.useEffect(() => {
        loadSessionData()
    }, [])

    loadSessionData = async () => {
        let sessionData = await SessionPersistence.get(sessionData)
        console.log({ sessionData })
    }

    const phoneRef = React.useRef()
    const opRef = React.useRef()
    const ibanRef = React.useRef()
    const phone2Ref = React.useRef()
    const op2Ref = React.useRef()

    const register = () => {
        const isValid = validateForm()
        if (!isValid) return displayErrorDialog()

        performLogin()
    }

    const displayErrorDialog = () => {
        setErrDlgVisible(true)
    }

    const hideErrorDialog = () => setErrDlgVisible(false)

    const performLogin = () => {
        let sessionData = {
            phone: phone,
            operator: selectedOp,
            iban: iban,
            bank: bank,
            phone2: phone2,
            operator2: selectedOp2,
        }
        console.log({ sessionData })
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

    const renderErrorDialog = () => (
        <Portal>
            <Dialog visible={errDlgVisible} onDismiss={hideErrorDialog}>
                <Dialog.Content>
                    <Paragraph>{_('validations.formError')}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button mode="text" onPress={hideErrorDialog}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )

    return (
        <SafeArea>
            <ScrollView>

                <Image source={require('../assets/images/logo.png')} />

                <VerticalSpace />

                <Input
                    ref={phoneRef}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    label={`${_('phone1')} (${_('phoneHint')})`}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    params={{ icon: 'phone' }}
                />

                <OperatorMenu ref={opRef} label={_('sim1')} onItemSelected={setOp} />

                <Input
                    ref={ibanRef}
                    label={_('iban')}
                    value={iban}
                    onChangeText={text => setIban(text)}
                    params={{ icon: 'bank' }}
                />

                <List.Accordion title={_('additionalInfo')}>

                    <VerticalSpace />

                    <Input
                        ref={phone2Ref}
                        keyboardType="phone-pad"
                        label={`${_('phone2')} (${_('phoneHint')})`}
                        value={phone2}
                        onChangeText={text => setPhone2(text)}
                        params={{ icon: 'phone' }}
                    />

                    <OperatorMenu ref={op2Ref} label={_('sim2')} onItemSelected={setOp2} />

                    <Input
                        label={_('bank')}
                        value={bank}
                        onChangeText={text => setBank(text)}
                        params={{
                            icon: 'bank',
                        }}
                    />
                </List.Accordion>

                <VerticalSpace />

                <Button onPress={register}> {_('login')} </Button>

                {renderErrorDialog()}
            </ScrollView>
        </SafeArea>
    )
}