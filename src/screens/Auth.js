import { Text, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { SessionContext } from '../../App'
import { Input, SafeArea } from '../components'
import { ScrollView } from '../components/styles'

export default function Auth() {
    const session = useContext(SessionContext)
    const [phone, setPhone] = useState("");
    const [phoneErrMsg, setPhoneErrMsg] = useState("")
    const [phone2, setPhone2] = useState("");
    const [phone2ErrMsg, setPhone2ErrMsg] = useState("")
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

                <Text>Language is {_('lang')}</Text>
                <Button title="Login" onPress={login} />

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
            </ScrollView>
        </SafeArea>
    )
}