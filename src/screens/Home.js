import React from 'react'
import { Purchase, Balance, More } from './'
import { BottomNavigation } from 'react-native-paper';

export default function Home() {

    const [index, setIndex] = React.useState(0)
    
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
            <BottomNavigation
                shifting
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                sceneAnimationEnabled={true}
            />
    )
}