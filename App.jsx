import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTask from './screens/AddTask';
import EditTask from './screens/EditTask';
import TaskList from './screens/TaskList';
import { initDB } from './components/SqliteFunctions'; // Adjust import path accordingly
import { Provider} from 'react-redux';
import store from './Redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  const navContainer = useNavigationContainerRef();
  const [isDBReady, setIsDBReady] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await initDB();
        setIsDBReady(true);
      } catch (error) {
        console.error('DB initialization failed:', error);
      }
    };
    initializeDatabase();
  }, []);

  if (!isDBReady) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#00E092"/>
      </View>
    );
  }

  return (
    <Provider store={store}>
    <NavigationContainer ref={navContainer}>
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={{
          contentStyle: { backgroundColor: '#FFFFFF' },
          headerShown: false,
        }}
      >
        <Stack.Screen name="TaskList" component={TaskList} />
        <Stack.Screen name="EditTask" component={EditTask} />
        <Stack.Screen name="AddTask" component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
