import React, { useContext, useState } from 'react'
import { SessionContext } from '../../App'
import { Input, SafeArea, Button } from '../components'
import { ScrollView } from '../components/styles'
import { OperatorMenu } from '../components'

export default function Auth() {
    const session = useContext(SessionContext)
    const [phone, setPhone] = useState("");
    const [phoneErrMsg, setPhoneErrMsg] = useState("")
    const [selectedOp, setOp] = useState(""); // Operator
    const [opErrMsg, setOpErrMsg] = useState("")
    const [phone2, setPhone2] = useState("");
    const [phone2ErrMsg, setPhone2ErrMsg] = useState("")
    const [selectedOp2, setOp2] = useState("");
    const [op2ErrMsg, setOp2ErrMsg] = useState("")
    const [iban, setIban] = useState("");
    const [ibanErrMsg, setIbanErrMsg] = useState("")
    const [bank, setBank] = useState("");
    const [bankErrMsg, setBankErrMsg] = useState("")

    const login = () => {
        session.changeSession(true)
    }

    return (
        <SafeArea>
            <ScrollView>
                <Input
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    label={_('phone1')}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    params={{
                        icon: 'phone',
                        errorMessage: phoneErrMsg,
                    }}
                />

                <OperatorMenu label={_('sim1')} onItemSelected={setOp} />

                <Input
                    keyboardType="phone-pad"
                    label={_('phone2')}
                    value={phone2}
                    onChangeText={text => setPhone2(text)}
                    params={{
                        icon: 'phone',
                        errorMessage: phone2ErrMsg,
                    }}
                />

                <OperatorMenu label={_('sim2')} onItemSelected={setOp2} />

                <Input
                    label={_('iban')}
                    value={iban}
                    onChangeText={text => setIban(text)}
                    params={{
                        icon: 'bank',
                        errorMessage: ibanErrMsg,
                    }}
                />
                <Input
                    keyboardType="phone-pad"
                    label={_('bank')}
                    value={bank}
                    onChangeText={text => setBank(text)}
                    params={{
                        icon: 'bank',
                        errorMessage: bankErrMsg,
                    }}
                />

                <Button
                    onPress={login}>
                    Login
                </Button>
            </ScrollView>
        </SafeArea>
    )
}