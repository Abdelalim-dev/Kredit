import React, { useContext } from 'react'
import styled from 'styled-components'
import { TabContext, TAB_SETTINGS } from '../screens/Home';
import { IconButton, Caption } from 'react-native-paper';

const EditProfileBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`
const ButtonText = styled(Caption)`
    font-size:14px;
`

export default SettingsButton = (props) => {

    const { changeTab } = useContext(TabContext)

    const openSettings = () => changeTab(TAB_SETTINGS)

    return <EditProfileBtn activeOpacity={0.7} onPress={openSettings} {...props}>
        <IconButton size={16} color="gray" icon="cog" />
        <ButtonText color="gray">{_('common.openSettings')}</ButtonText>
    </EditProfileBtn>

}