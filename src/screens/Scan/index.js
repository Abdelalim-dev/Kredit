// Scan
import React from 'react'
import { Dimensions, Linking, useWindowDimensions, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LottieView from 'lottie-react-native';
import {
    SafeArea, BottomContainer, ScrollView, SectionTitle,
    Description, ResetDescription, ItemStyled, ItemTitleStyled,
    TopContainer, Title, CameraPreview, Logo, PreviewBadge
} from './components.styles'
import * as Components from './components.styles'
import { Button } from 'src/components'
import { IconButton } from 'react-native-paper';
import { cameraPermissionOptions } from './config'
import { AIRTIME_USSDS } from '../../utils/Constants'
import * as Formatter from 'src/utils/Formatter'




const CAM_VIEW_HEIGHT = Dimensions.get('screen').width * 1.5;
const LIMIT_TOP = CAM_VIEW_HEIGHT * 0.33;
const LIMIT_BOTTOM = LIMIT_TOP + 80;


export default function Scan({ navigation, route }) {
    const cameraRef = React.useRef()
    const wrongCodes = React.useRef({})
    const [suggestions, setSuggestions] = React.useState([])

    const [flashOn, setFlashOn] = React.useState(false)

    const { width: windowWidth } = useWindowDimensions();
    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
    const { params: { operator: SelectedOperator } } = route

    const textRecognized = ({ textBlocks }) => {
        if (textBlocks.length > 0) {

            textBlocks.forEach(block => {

                const { bounds: { origin: { y: originY } } } = block

                if (originY > LIMIT_TOP && originY < LIMIT_BOTTOM) { // Scan only within the preview section instead of the whole screen

                    // Sometimes multiple lines are recognized as a single string
                    block.value.split('\n').forEach(subBlock => handleScan(subBlock))
                }
            })
        }
    }

    const handleScan = (text) => {

        let voucherCode = getSerialNumber(text)

        if (!voucherCode || wrongCodes.current[voucherCode]) return;

        const newSuggestions = [...suggestions]

        if (!newSuggestions.includes(voucherCode)) newSuggestions.push(voucherCode)

        if (newSuggestions.length != suggestions.length) setSuggestions(newSuggestions)
    }

    const getSerialNumber = (text) => {

        if (text.length < 10) return false

        let serial = text.replace(/[^0-9]/g, '')

        if (serial.length >= 15 && serial.length <= 18) return serial;
    }

    const onReset = () => {
        setSuggestions([])
        wrongCodes.current = {}
    }

    const openSettings = () => {
        navigation.goBack()
        Linking.openSettings()
    }

    const CardItem = ({ index, number }) => {

        const USSDFromContext = AIRTIME_USSDS[SelectedOperator]

        const dialNumber = (voucherCode = 0, USSD) => Linking.openURL(`tel:*${USSD}*${voucherCode}#`)

        const removeFromSuggestions = (index, voucherCode) => {
            setSuggestions([...suggestions.slice(0, index), ...suggestions.slice(index + 1)])
            wrongCodes.current[voucherCode] = true
        }

        return <ItemStyled onPress={() => dialNumber(number, USSDFromContext)}>
            <ItemTitleStyled title={Formatter.airtime(number).toString()} subtitle={`${number.length} ${_('screens.scan.digits')}`}
                right={() => <IconButton icon="close" onPress={() => removeFromSuggestions(index, number)} />}
            />
        </ItemStyled>
    }

    const ShimmerSuggestionsView = () => <>

        <ShimmerPlaceHolder style={{ borderRadius: 0, marginTop: 16, marginBottom: 10 }} width={(150)} />
        <ShimmerPlaceHolder style={{ borderRadius: 0, marginBottom: 6 }} width={(windowWidth - 32)} height={10} />
        <ShimmerPlaceHolder style={{ borderRadius: 0, marginBottom: 12 }} width={(250)} height={10} />
        {[0, 1].map((_, index) =>
            <Components.ShimmerItemStyled key={index}>
                <ItemTitleStyled
                    left={() => <ShimmerPlaceHolder style={{ borderRadius: 12 }} width={(250)} />}
                    right={() => <Components.ShimmerDot />}
                />
            </Components.ShimmerItemStyled>
        )}


        <ResetDescription>{_('screens.scan.noSuggestions')}</ResetDescription>
        <Button mode="text" onPress={onReset}>{_('reset')}</Button>
    </>

    const SuggestionItems = () =>
        suggestions.map((value, index) => <CardItem key={index} index={index} number={value} />)

    const Suggestions = () => (
        !suggestions.length ? <ShimmerSuggestionsView /> :
            <ScrollView contentContainerStyle={{ paddingBottom: 8 }}>
                <SectionTitle>{_('screens.scan.suggestionsTitle')}</SectionTitle>
                <Description>{_('screens.scan.description')}</Description>
                <SuggestionItems />
            </ScrollView>
    )

    const IosClose = () =>
        Platform.OS != "ios" ? null : <Components.CloseButton icon="close" onPress={() => navigation.goBack()} />

    const CameraNotAuthorizedView = () => <Components.CameraNotAuthorizedContainer>
        <Components.Icon icon="camera-off" size={64} />
        <Components.CenterTitle>{_('screens.scan.cameraNotAuthorizedTitle')}</Components.CenterTitle>
        <Components.CenterText>{_('screens.scan.cameraNotAuthorized')}</Components.CenterText>
        <Button mode="text" onPress={openSettings}>{_('screens.scan.openPermissions')}</Button>
    </Components.CameraNotAuthorizedContainer >


    return (
        <SafeArea>
            <IosClose />
            <RNCamera
                ref={cameraRef}
                style={{ flex: 1 }}
                captureAudio={false}
                type={RNCamera.Constants.Type.back}
                flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={cameraPermissionOptions}
                onTextRecognized={textRecognized}
                notAuthorizedView={<CameraNotAuthorizedView />}
            >
                <TopContainer>
                    <Logo source={require('src/assets/images/logo.png')}></Logo>
                    <Title>{_('screens.scan.title')}</Title>
                </TopContainer>

                <CameraPreview >
                    <PreviewBadge>{SelectedOperator}</PreviewBadge>

                    <LottieView source={require('src/assets/animations/scan_matrix.json')} autoPlay loop />

                    <Components.FlashButton color="#FFFFFF" size={20} onPress={() => setFlashOn(!flashOn)}
                        icon={flashOn ? 'lightbulb-on-outline' : 'lightbulb-outline'} />
                </CameraPreview>

                <BottomContainer>
                    <Suggestions />
                </BottomContainer>
            </RNCamera>
        </SafeArea >
    )
}