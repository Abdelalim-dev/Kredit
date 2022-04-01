import React from 'react'
import { Platform } from 'react-native'
import Input from './Input'
import { Menu, List, TextInput } from 'react-native-paper';
import styled from 'styled-components';

const MenuStyled = styled(Menu)`
    width: 80%;
    margin-bottom: 12px;
    padding-bottom: 12px;
`

const Icon = styled(TextInput.Icon)`
`

/**
 * 
 * @param {onItemSelected: callback, icon: string, items: array(string)} props 
 * @param {*} ref 
 * @returns Node
 */
function Select(props, ref) {
    const [visible, setVisible] = React.useState(false)
    const [value, setValue] = React.useState("")
    const inputRef = React.useRef()

    React.useImperativeHandle(ref, () => ({ isValid }))

    const isValid = (validations) => inputRef.current.isValid(validations)

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleItemSelected = (value) => {
        const { onItemSelected } = props
        setValue(value)
        inputRef.current.handleTextChange(value)
        onItemSelected && onItemSelected(value)
        closeMenu()
    }

    const clear = () => {
        const { onItemSelected } = props
        setValue("")
        inputRef.current.handleTextChange("")
        onItemSelected && onItemSelected("")
    }

    const menuAnchor = () => (
        <Input
            ref={inputRef}
            onPressIn={openMenu}
            label={props.label}
            editable={false}
            value={value}
            {...props}
            params={{
                icon: props.icon || "",
                right: <Icon name='close' onPress={clear} />,
                inputOverlay: Platform.OS == 'android'
            }}
        />
    )

    return (
        <MenuStyled
            visible={visible}
            onDismiss={closeMenu}
            anchor={menuAnchor()}>
            {props.items.map((value, index) =>
                <List.Item key={index} title={value} onPress={() => { handleItemSelected(value) }} />
            )}
        </MenuStyled>
    )
}

export default React.forwardRef(Select)