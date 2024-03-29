import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PurchaseScreen from './PurchaseScreen'
import Scan from '../Scan'
import { ROUTES } from '../../utils/Constants'


const Stack = createNativeStackNavigator();

const options = { headerShown: false }

function PurchaseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.PURCHASE} component={PurchaseScreen} options={options} />
      <Stack.Screen name={ROUTES.SCAN} component={Scan} options={options} />
    </Stack.Navigator>
  );
}


export default PurchaseStack;