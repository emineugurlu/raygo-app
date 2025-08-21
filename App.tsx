import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export default function App() {
  useEffect(() => {
    const errorHandler = (e: any, isFatal?: boolean) => {
      console.error(e);
      Alert.alert(
        isFatal ? 'Fatal Error' : 'Error',
        `${e.name}\n${e.message}`
      );
    };
    // @ts-ignore
    ErrorUtils.setGlobalHandler(errorHandler);
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
