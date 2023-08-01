import React, { createContext, useContext } from 'react'
import { Purchase, Balance, Settings, More } from './'
import { BottomNavigation } from 'react-native-paper';
import { SessionContext } from '../../App';
import { postCustomer } from '../services/api/customer'

export const TabContext = createContext()

export const TAB_PURCHASE = 0
export const TAB_BALANCE = 1
export const TAB_SETTINGS = 2
export const TAB_HOME = 3

export default function Home() {

    const { session, changeSession } = useContext(SessionContext)

    const [index, setIndex] = React.useState(0)

    const tabValue = {
        currentTab: index,
        changeTab: setIndex
    }

    const [routes] = React.useState([
        { key: "purchase", title: _('purchase'), icon: 'plus-circle-outline' },
        { key: "balance", title: _('balance'), icon: 'wallet-outline' },
        { key: "settings", title: _('settings'), icon: 'cog' },
        // { key: "more", title: _('more'), icon: 'dots-horizontal' },
    ])

    React.useEffect(() => {
        syncUpSession()
    }, [session])

    const syncUpSession = () => {

        postCustomer(session).then(({ id }) => {

            if (session['id'] == undefined) {
                changeSession({ id, ...session })
            }
        })
    }

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'purchase':
                return <Purchase jumpTo={jumpTo} />
            case 'balance':
                return <Balance jumpTo={jumpTo} />
            case 'settings':
                return <Settings jumpTo={jumpTo} editing />
        }
    }

    return (
        <TabContext.Provider value={tabValue}>
            <BottomNavigation
                shifting
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                sceneAnimationEnabled={true}
            />
        </TabContext.Provider>
    )
}