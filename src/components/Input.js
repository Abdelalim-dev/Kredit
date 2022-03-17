import React from 'react'
import { View } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper';
import * as Linter from '../utils/Lint'


function Input(props, ref) {

    const [errorMessage, setErrorMessage] = React.useState("")

    React.useImperativeHandle(ref, () => ({ isValid , handleTextChange}));

    const handleTextChange = (text) => {
        const { onChangeText } = props;
        setErrorMessage("")
        onChangeText && onChangeText(text);
    }

    const isValid = (validations) => {
        const { OPTIONAL, REQUIRED, REQUIRED_IF, PHONE, IBAN } = Linter
        const { value } = props

        if (validations[REQUIRED] && !Linter.required(value)) {
            setErrorMessage(_(`validations.${REQUIRED}`))
            return false

        } else if (validations[REQUIRED_IF]) {
            const [otherField, otherValue] = validations[REQUIRED_IF]
            if (!Linter.requiredIf(value, otherValue)) {
                setErrorMessage(_(`validations.${REQUIRED_IF}`).replace(':attribute', `${_(otherField)}`))
                return false
            }
        }

        const isOptional = !!validations[OPTIONAL]

        if (validations[PHONE] && !Linter.phone(value, isOptional)) {
            setErrorMessage(_(`validations.${PHONE}`))
            return false

        } else if (validations[IBAN] && !Linter.iban(value, isOptional)) {
            setErrorMessage(_(`validations.${IBAN}`))
            return false
        }
        return true
    }

    const { icon } = props.params || {}
    return (
        <View>
            <TextInput
                {...props}
                mode='outlined'
                // dense={true}
                autoCorrect={false}
                onChangeText={handleTextChange}
                error={errorMessage != ""}
                left={icon && <TextInput.Icon name={icon} />}
            />
            <HelperText style={{ marginBottom: 10 }} type="error" visible={errorMessage != ""}>
                {errorMessage || ""}
            </HelperText>
        </View>
    )
}

export default React.forwardRef(Input)