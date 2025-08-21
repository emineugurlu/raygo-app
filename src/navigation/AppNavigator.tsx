import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding1 from '../screens/Onboarding1';
import Onboarding2 from '../screens/Onboarding2';
import Onboarding3 from '../screens/Onboarding3';
import Onboarding4 from '../screens/Onboarding4';
import Register from '../screens/Register';
import Login from '../screens/Login';
import CitySelect from '../screens/CitySelect';
import RouteSelect from '../screens/RouteSelect';
import RouteResult from '../screens/RouteResult';

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Onboarding4: undefined;
  Register: undefined;
  Login: undefined;
  CitySelect: undefined;
  RouteSelect: { selectedCity: string; selectedSystem: string };
  RouteResult: {
    startStation: string;
    endStation: string;
    selectedCity: string;
    selectedSystem: string;
  };
};


const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="Onboarding4" component={Onboarding4} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CitySelect" component={CitySelect} />
      <Stack.Screen name="RouteSelect" component={RouteSelect} />
      <Stack.Screen name="RouteResult" component={RouteResult} />
    </Stack.Navigator>
  );
}
