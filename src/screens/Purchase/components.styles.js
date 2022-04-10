import styled from 'styled-components'
import { Button } from '../../components'
import { Caption as CaptionPaper, Headline as H, FAB as FloatingButton, Title as T } from 'react-native-paper'


export const SafeArea = styled.SafeAreaView`
    flex:1;
    background-color: #FFF;
`

export const ScrollView = styled.ScrollView`
`

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
    padding-top: 16px;
    margin-horizontal: 16px;
`

export const Banner = styled.Image`
    min-height:300px;
    height:auto;
    width:100%;
    margin-horizontal:-16px;
`

export const AccessoryContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 4px;
    background-color: #D1D4D9;
`

export const Headline = styled(H)`
    text-align: center;
`

export const ActionButton = styled(Button)`
    margin-top: 32px;
    margin-bottom: 16px;
`

export const FAB = styled(FloatingButton)`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 16px;
`

export const Row = styled.View`
    flex-direction:row;
    justify-content: space-between;
`

export const Column = styled.View`
    flex:1;
`

export const VSpace = styled.View`
    width: 16px;
`

export const Caption = styled(CaptionPaper)`
    text-align: center;
`

export const Title = styled(T)`
    color: ${({ disabled }) => disabled ? '#989898' : '#FFF'};
    text-align: center;
`

export const EditProfileBtn = styled(Button)`
    margin-top: 16px;
`