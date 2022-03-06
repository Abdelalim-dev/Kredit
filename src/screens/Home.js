import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Scan, Purchase, Balance } from './'

const Tab = createBottomTabNavigator();
export default function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Scan" component={Scan} />
            <Tab.Screen name="Purchase" component={Purchase} />
            <Tab.Screen name="Balance" component={Balance} />
        </Tab.Navigator>
    )
}