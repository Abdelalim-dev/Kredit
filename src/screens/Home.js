import React from 'react'
import { Scan, Purchase, Balance } from './'
import { BottomNavigation } from 'react-native-paper';

export default function Home() {

    const [index, setIndex] = React.useState(0)
    
    const [routes] = React.useState([
        { key: "scan", title: _('scan'), icon: 'line-scan' },
        { key: "balance", title: _('balance'), icon: 'wallet-outline' },
        { key: "purchase", title: _('purchase'), icon: 'plus-circle-outline' },
        { key: "more", title: _('more'), icon: 'dots-horizontal' },
    ])

    const renderScene = BottomNavigation.SceneMap({
        scan: Scan,
        purchase: Purchase,
        balance: Balance,
        more: Scan, // TODO: Create a component for this
    })

    return (
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                sceneAnimationEnabled={true}
            />
    )
}