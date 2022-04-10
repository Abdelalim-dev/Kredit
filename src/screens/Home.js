import React, { createContext } from 'react'
import { Purchase, Balance, More } from './'
import { BottomNavigation } from 'react-native-paper';

export const TabContext = createContext()

export const TAB_PURCHASE = 0
export const TAB_BALANCE = 1
export const TAB_MORE = 2

export default function Home() {

    const [index, setIndex] = React.useState(0)

    const tabValue = {
        currentTab: index,
        changeTab: setIndex
    }

    const [routes] = React.useState([
        { key: "purchase", title: _('purchase'), icon: 'plus-circle-outline' },
        { key: "balance", title: _('balance'), icon: 'wallet-outline' },
        { key: "more", title: _('more'), icon: 'dots-horizontal' },
    ])

    const renderScene = BottomNavigation.SceneMap({
        purchase: Purchase,
        balance: Balance,
        more: More,
    })

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