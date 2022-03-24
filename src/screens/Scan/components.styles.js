import styled from 'styled-components'
import { Headline } from 'react-native-paper'


export const SafeArea = styled.SafeAreaView`
    flex:1;
`

export const TitleContainer = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: gray;
`

export const CameraPreview = styled.View`
    flex: 1;
`

export const TorchContainer = styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
    background-color: gray;
`

export const TorchButton = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
    background-color: ${({ flashOn }) => flashOn ? '#fff' : 'gray'};
    border-radius: ${({ flashOn }) => flashOn ? '40px' : 0};
`

export const TorchIcon = styled.Image`
    width: 64px;
    height: 64px;
`

export const Title = styled(Headline)`
`