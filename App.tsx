import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoryListScreen from './src/screens/StoryListScreen';
import StoryReaderScreen from './src/screens/StoryReaderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  console.log('App is rendering...');

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StoryList"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="StoryList" component={StoryListScreen} />
        <Stack.Screen name="StoryReader" component={StoryReaderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
