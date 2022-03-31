import styled from 'styled-components'
import { Title as T, IconButton, Card, Subheading, Caption } from 'react-native-paper'


export const SafeArea = styled.SafeAreaView`
    flex:1;
`

export const Container = styled.View`
`

export const TopContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
`

export const Logo = styled.Image`
    width: 128px;
    height: 128px;
`

export const Title = styled(T)`
`

export const CameraPreview = styled.View`
    flex: 1;
`

export const BottomContainer = styled.View`
    flex: 2;
    justify-content: center;
    background-color: #fafafa;
    padding-left: 16px;
    padding-right: 16px;
`

export const TorchButton = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
    background-color: ${({ flashOn }) => flashOn ? '#fff' : 'gray'};
    border-radius: ${({ flashOn }) => flashOn ? '40px' : 0};
`

export const TorchIcon = styled(IconButton)`
    width: 64px;
    height: 64px;
`

export const ScrollView = styled.ScrollView`
`

export const SectionTitle = styled(Subheading)`
    margin-top: 16px;
`

export const Description = styled(Caption)`
`

export const PreviewBadge = styled(Description)`
    background-color: #FFF;
    border-radius: 4px;
    color: #000;
    padding-horizontal: 3px;
    margin-left: 1px;
    align-self: flex-start;
    opacity: 0.6;
`

export const ResetDescription = styled(Caption)`
    text-align: center;
    margin-top: 16px;
`

export const ItemStyled = styled(Card)`
    margin-top: 4px;
    // Against clipping card shadow by parent view
    margin-left:1px; 
    margin-right:1px; 
`

export const ItemTitleStyled = styled(Card.Title)`
    font-size: 4px;
`

export const ShimmerItemStyled = styled(ItemStyled)`
    elevation: 0;
    background-color: #f4f4f4;
    `

export const ShimmerDot = styled.View`
    width: 24px;
    height: 24px;
    border-radius:12px;
    background-color: #e0e0e0;
    margin: 12px;
`