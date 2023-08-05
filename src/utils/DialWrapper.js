import { Linking, Platform } from 'react-native'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const DialWrapper = {
    dial: (number) => {
        if (Platform.OS === 'android') {
            RNImmediatePhoneCall.immediatePhoneCall(number);
        } else {
            Linking.openURL(`tel:${number}`)
        }
    }
}

export default DialWrapper