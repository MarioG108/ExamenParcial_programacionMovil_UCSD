import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import CalculadoraScreen from './screens/CalculadoraScreen';
import NombresScreen from './screens/NombresScreen';
import PasosScreen from './screens/PasosScreen';
import FrasesScreen from './screens/FrasesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1a1a2e',
            borderTopColor: '#333',
            paddingBottom: 5,
            height: 60,
          },
          tabBarActiveTintColor: '#ffd700',
          tabBarInactiveTintColor: '#888',
          tabBarIcon: ({ focused, color }) => {
            let icono = '';
            if (route.name === 'Calculadora') icono = 'calculate';
            else if (route.name === 'Nombres') icono = 'person';
            else if (route.name === 'Pasos') icono = 'directions-walk';
            else if (route.name === 'Frases') icono = 'format-quote';
            return <MaterialIcons name={icono} size={focused ? 28 : 24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Calculadora" component={CalculadoraScreen} />
        <Tab.Screen name="Nombres" component={NombresScreen} />
        <Tab.Screen name="Pasos" component={PasosScreen} />
        <Tab.Screen name="Frases" component={FrasesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
