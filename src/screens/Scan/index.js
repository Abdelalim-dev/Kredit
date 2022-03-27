// Scan
import React from 'react'
import { RNCamera } from 'react-native-camera';
import { SafeArea, TorchContainer, TorchButton, TorchIcon } from './components.styles'
import { TitleContainer, Title, CameraPreview } from './components.styles'
import { StatusBar, Dimensions, Text, View, Alert, Linking } from 'react-native';
import { cameraPermissionOptions } from './config'
import { purchaseFormula } from 'src/utils/Constants'




const CAM_VIEW_HEIGHT = Dimensions.get('screen').width * 1.5;
const LIMIT_TOP = CAM_VIEW_HEIGHT * 0.33;
const LIMIT_BOTTOM = LIMIT_TOP + 80;

export default function Scan({ navigation, route }) {
    const cameraRef = React.useRef()
    const textDetected = React.useRef(false)
    const wrongCodes = React.useRef({})
    const [suggestions, setSuggestions] = React.useState([])

    const [flashOn, setFlashOn] = React.useState(false)

    const textRecognized = ({ textBlocks }) => {
        if (textBlocks.length > 0) {

            textBlocks.forEach(block => {
                if (block.bounds.origin.y > LIMIT_TOP && block.bounds.origin.y < LIMIT_BOTTOM) {
                    handleScan(block.value)
                }
            })
        }
    }

    const handleScan = (text) => {

        if (!textDetected.current) {
            textDetected.current = true;
            let voucherCode = getSerialNumber(text)

            if (!voucherCode || wrongCodes.current[voucherCode]) {
                textDetected.current = false;
                return;
            }

            const newSuggestions = [...suggestions]
            
            if (!newSuggestions.includes(voucherCode)) newSuggestions.push(voucherCode)
            
            if (newSuggestions.length != suggestions.length) setSuggestions(newSuggestions)

            // cameraRef.current.pausePreview()
            // showVoucherCodeAlert(voucherCode,
            //     () => callSerial(voucherCode), () => tryAgain(voucherCode))
        }
    }

    const showVoucherCodeAlert = (voucherCode, onSuccess, onFailure) => {
        Alert.alert(_('screens.scan.codeDetected'), voucherCode,
            [
                {
                    text: _('screens.scan.tryAgain'),
                    onPress: onFailure,
                    style: "cancel"
                },
                { text: _('misc.confirm'), onPress: onSuccess }
            ],
            { cancelable: false }
        )
    }

    const tryAgain = (wrongVoucherCode) => {
        wrongCodes.current[wrongVoucherCode] = true

        textDetected.current = false;
        cameraRef.current.resumePreview()
    }

    const getSerialNumber = (text) => {
        if (text.length > 10) {
            let serial = text.replace(/[^0-9]/g, '')
            if (serial.length >= 15 && serial.length <= 18) return serial;
        }
        return false;
    }

    const callSerial = async (voucherCode) => {
        console.warn('callSerial', voucherCode)
        // TODO: Get the selected phone from route params
        // const ussd = purchaseFormula(ussd, voucherCode)
        Linking.openURL(`tel:${voucherCode}`)
        navigation.goBack()
    }

    const TitleSection = () => <TitleContainer>
        <Title>{_('screens.scan.title')}</Title>

    </TitleContainer>

    const TorchSection = () => <TorchContainer>
        <TorchButton flashOn={flashOn} onPress={() => setFlashOn(!flashOn)} >
            <TorchIcon icon={`lightbulb-${flashOn ? 'on' : 'off'}`} size={64} />
        </TorchButton>
    </TorchContainer>

    return (
        <SafeArea>
            <RNCamera
                ref={cameraRef}
                style={{ flex: 1 }}
                captureAudio={false}
                type={RNCamera.Constants.Type.back}
                flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={cameraPermissionOptions}
                onTextRecognized={textRecognized}
            >
                <TitleSection />

                <CameraPreview />

                <TorchSection />
            </RNCamera>
        </SafeArea>
    )
}