import React, { useContext } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { TabContext, TAB_SETTINGS } from '../screens/Home';

const EditProfileBtn = styled(Button)`
    margin-top: 16px;
`

export default SettingsButton = () => {

    const { changeTab } = useContext(TabContext)

    const openSettings = () => changeTab(TAB_SETTINGS)

    return <EditProfileBtn
        color="gray"
        icon="cog"
        mode="text"
        uppercase={false}
        onPress={openSettings}>
        {_('common.openSettings')}
    </EditProfileBtn>
}