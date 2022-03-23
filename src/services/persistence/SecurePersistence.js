import EncryptedStorage from 'react-native-encrypted-storage';

export default {
    storeData: async function (key, stringValue) {
        try {
            await EncryptedStorage.setItem(key, stringValue);
        } catch (error) {
            console.log(error.code);
        }
    },

    retrieveData: async function (key) {
        try {
            return await EncryptedStorage.getItem(key) || null;
        } catch (error) {
            console.log(error.code);
            return null
        }
    },

    remove: async function (key) {
        try {
            await EncryptedStorage.removeItem(key);
        } catch (error) {
            console.log(error.code);
        }
    },

    clearStorage: async function () {
        try {
            await EncryptedStorage.clear();
        } catch (error) {
            console.log(error.code);
        }
    }
}