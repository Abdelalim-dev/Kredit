import styled from 'styled-components'
import { Title as T, IconButton, Card, Subheading, Caption } from 'react-native-paper'


export const SafeArea = styled.SafeAreaView`
    flex:1;
    background-color: #FFF;
`

export const CloseButton = styled(IconButton)`
    width: 24px;
    height: 24px;
    margin-right: 16px;
    align-self: flex-end;
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

export const BottomContainer = styled.ScrollView`
    flex: 2;
    background-color: #fafafa;
    padding-left: 16px;
    padding-right: 16px;
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
    padding-left: 3px;
    padding-right: 3px;
    margin-left: 1px;
    align-self: flex-start;
    opacity: 0.6;
`

export const FlashButton = styled(IconButton)`
    width: 24px;
    height: 24px;
    position: absolute;
    bottom: 8px;
    right: 8px;
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