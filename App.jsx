import { useEffect, useState } from 'react';

import AppContext from './src/context/AppContext';
import { Entypo } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons';
// import History from './src/screens/History';
import Home from './src/screens/Home';
import { Ionicons } from '@expo/vector-icons';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Settings from './src/screens/Settings';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import initializeDB from './src/services/InitializedDB';

const Tab = createMaterialBottomTabNavigator()

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection'])

export default function App() {
  const [db, setDb] = useState(null)

  useEffect(() => {
    const initDB = async () => {
      const DB = await initializeDB();
      setDb(DB);
    }
    initDB().then();
  }, [db])

  return (
    <AppContext.Provider value={{ db }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            backBehavior='history'
            inactiveColor='#0A0101'
            activeColor='#F53D3D'
            barStyle={{ backgroundColor: '#FFFAFA', position: 'absolute' }}
            shifting
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ color }) => <Entypo name="home" size={22} color={color} />
              }}
            />
            {/* <Tab.Screen name="History" component={History} options={{
              tabBarIcon: ({ color }) => <FontAwesome name="history" size={22} color={color} />
            }} /> */}
            <Tab.Screen name='Settings' component={Settings} options={{
              tabBarIcon: ({ color }) => <Ionicons name="settings-sharp" size={22} color={color} />
            }} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
}