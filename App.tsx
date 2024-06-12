// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import SnapshotScreen from './src/screens/SnapshotScreen';
import BootSplash from 'react-native-bootsplash';
import { COLORS } from './src/constants/colors';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide();
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Snapshot" component={SnapshotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
