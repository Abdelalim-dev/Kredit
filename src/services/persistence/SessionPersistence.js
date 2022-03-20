import SecurePersistence from './SecurePersistence'

const KEY_SESSION = "session"

export default {

    save: async function (session) {
        await SecurePersistence.storeData(KEY_SESSION, JSON.stringify(session));
    },

    get: async function () {
        session = await SecurePersistence.retrieveData(KEY_SESSION)
        return JSON.parse(session)
    },

    remove: async function () {
        await SecurePersistence.remove(KEY_SESSION);
    }
}