import React from 'react'
import { Platform } from 'react-native'
import Input from './Input'
import { Menu, List, TextInput } from 'react-native-paper';
import { operators } from '../utils/Constants'
import styled from 'styled-components';

const MenuStyled = styled(Menu)`
    width: 80%;
    margin-bottom: 12px;
    padding-bottom: 12px;
`

function OperatorMenu(props, ref) {
    const [visible, setVisible] = React.useState(false)
    const [operator, setOperator] = React.useState("")
    const inputRef = React.useRef()

    React.useImperativeHandle(ref, () => ({ isValid }))

    const isValid = (validations) => inputRef.current.isValid(validations)

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleOperatorSelect = (value) => {
        const { onItemSelected } = props
        setOperator(value)
        inputRef.current.handleTextChange(value)
        onItemSelected && onItemSelected(value)
        closeMenu()
    }

    const clear = () => {
        const { onItemSelected } = props
        setOperator("")
        inputRef.current.handleTextChange("")
        onItemSelected && onItemSelected("")
    }

    const menuAnchor = () => (
        <Input
            ref={inputRef}
            onPressIn={openMenu}
            label={props.label || _('sim')}
            editable={false}
            value={operator}
            params={{
                icon: 'sim',
                right: <TextInput.Icon name='close' onPress={clear} />,
                inputOverlay: Platform.OS == 'android'
            }}
        />
    )

    return (
        <MenuStyled
            visible={visible}
            onDismiss={closeMenu}
            anchor={menuAnchor()}>
            {operators.map((operator, index) =>
                <List.Item key={index} title={operator} onPress={() => { handleOperatorSelect(operator) }} />
            )}
        </MenuStyled>
    )
}

export default React.forwardRef(OperatorMenu)