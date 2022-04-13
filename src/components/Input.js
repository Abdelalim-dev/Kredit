import React from 'react'
import { TextInput, HelperText } from 'react-native-paper';
import * as Linter from '../utils/Lint'
import styled from 'styled-components';

const Overlay = styled.Text`
    position: absolute;
    height: ${({ dense }) => dense ? '40px' : '56px'};
    left: ${({ left }) => left ? '42px' : 0};
    right: ${({ right }) => right ? '42px' : 0};
    top: 7px;
`
const View = styled.View``

const TextInputStyled = styled(TextInput)`
    background-color: #FBFBFB;
`

function Input(props, ref) {

    const [errorMessage, setErrorMessage] = React.useState("")

    const inputRef = React.useRef()

    React.useImperativeHandle(ref, () => ({ isValid, handleTextChange, focus, blur }));

    const focus = () => inputRef.current.focus()
    const blur = () => inputRef.current.blur()

    const handleTextChange = (text) => {
        const { onChangeText } = props;
        setErrorMessage("")
        onChangeText && onChangeText(text);
    }

    const isValid = (validations) => {
        const { OPTIONAL, REQUIRED, REQUIRED_IF, PHONE, IBAN, CHARGE_AMOUNT } = Linter
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

        if (validations[CHARGE_AMOUNT] && !Linter.positive(value)) {
            setErrorMessage(_(`validations.${CHARGE_AMOUNT}`))
            return false

        } else if (validations[PHONE] && !Linter.phone(value, isOptional)) {
            setErrorMessage(_(`validations.${PHONE}`))
            return false

        }
        return true
    }

    const { icon, right, inputOverlay } = props.params || {}

    /**
     * A workaround to allow clicking on a non editable input on Android
     * @returns React.ReactNode
     */
    const androidInputOverlay = () => (<Overlay
        left={!!icon} right={!!right} dense={!!props.dense}
        onPress={() => props.onPressIn && props.onPressIn()}>
    </Overlay>)

    return (
        <View style={{ marginBottom: 4, ...props.containerStyle }}>
            <View>
                <TextInputStyled
                    ref={inputRef}
                    {...props}
                    underlineColor={"#DDD"}
                    autoCorrect={false}
                    onChangeText={handleTextChange}
                    error={errorMessage != ""}
                    left={icon && <TextInput.Icon color="#666" name={icon} />}
                    right={right}
                />
                {inputOverlay && androidInputOverlay()}
            </View>
            <HelperText type="error" visible={errorMessage != ""}>
                {errorMessage}
            </HelperText>
        </View>
    )
}

export default React.forwardRef(Input)