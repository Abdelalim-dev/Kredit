import React from 'react'
import Input from './Input'
import { Menu, List } from 'react-native-paper';
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
        onItemSelected && onItemSelected(value)
        closeMenu()
    }

    return (
        <MenuStyled
            visible={visible}
            onDismiss={closeMenu}
            anchor={
                <Input
                    ref={inputRef}
                    onPressIn={openMenu}
                    label={props.label || _('sim')}
                    editable={false}
                    value={operator}
                    params={{ icon: 'sim', }}
                />
            }>
            {operators.map((operator, index) =>
                <List.Item key={index} title={operator} onPress={() => { handleOperatorSelect(operator) }} />
            )}
        </MenuStyled>
    )
}

export default React.forwardRef(OperatorMenu)