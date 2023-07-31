
import React from 'react'
import styled from 'styled-components'
import { Caption, IconButton, Title as T } from 'react-native-paper'
import colors from 'src/theme/colors'

export const Column = styled.View`
    flex:1;
`
export const Touchable = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    height: 150px;
    border-radius: 25px;
    background-color: ${({ disabled }) => disabled ? colors.gray : colors.primary};
`
export const Icon = styled(IconButton)`
    color: ${({ disabled }) => disabled ? colors.grayDark : '#FFF'};
`
export const Title = styled(T)`
    padding: 4px;
    color: ${({ disabled }) => disabled ? colors.grayDark : '#FFF'};
    text-align: center;
    font-size: 16px;
    font-weight: 600;
`
export const Subtitle = styled(Caption)`
    text-align: center;
`

export default BigButton = (props) => {
    const { disabled, value, icon, subtitle, uppercase } = props;
    const title = (uppercase == undefined || uppercase) ? value?.toUpperCase() : value;

    return <Column>
        <Touchable activeOpacity={0.7} {...props}>
            <Icon icon={icon} color={disabled ? colors.grayDark : '#FFF'} {...props} />
            <Title disabled={disabled}>{title}</Title>
        </Touchable>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Column>
}