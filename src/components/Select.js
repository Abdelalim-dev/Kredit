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

const Touchable = styled.TouchableOpacity`
`

/**
 * 
 * @param {
 *  onItemSelected: callback,
 *  icon: string,
 *  items: array(string)
 *  anchor: Node?
 * } props 
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

        // For default anchor only
        !props.customAnchor && inputRef.current.handleTextChange(value)

        onItemSelected && onItemSelected(value)
        closeMenu()
    }

    const onRightPress = () => {
        if (value || props.value) clear()
        else setVisible(true)
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
                right: <TextInput.Icon
                    name={(props.value || value) ? 'close' : 'chevron-down'}
                    color="#AAA" onPress={onRightPress} />,
                inputOverlay: Platform.OS == 'android'
            }}
        />
    )

    const wrapAnchor = (anchor) => <Touchable onPress={openMenu}>{anchor}</Touchable>

    const { customAnchor } = props
    return (
        <MenuStyled
            visible={visible}
            onDismiss={closeMenu}
            anchor={customAnchor ? wrapAnchor(customAnchor) : menuAnchor()}>
            {props.items.map((value, index) =>
                <List.Item key={index} title={value} onPress={() => { handleItemSelected(value) }} />
            )}
        </MenuStyled>
    )
}

export default React.forwardRef(Select)