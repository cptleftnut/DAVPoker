import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import OpponentScreen from './src/screens/OpponentScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

/**
 * DAVPoker Mobile App
 * AI-Powered Poker Decision Engine for Android
 */
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0f1729" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Home') {
                iconName = focused ? 'cards' : 'cards-outline';
              } else if (route.name === 'Analytics') {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              } else if (route.name === 'Opponents') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else {
                iconName = 'help-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#10b981',
            tabBarInactiveTintColor: '#6b7280',
            tabBarStyle: {
              backgroundColor: '#1f2937',
              borderTopColor: '#374151',
              borderTopWidth: 1,
              paddingBottom: 5,
              paddingTop: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 0,
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Hand Analyzer' }}
          />
          <Tab.Screen
            name="Analytics"
            component={AnalyticsScreen}
            options={{ title: 'Analytics' }}
          />
          <Tab.Screen
            name="Opponents"
            component={OpponentScreen}
            options={{ title: 'Opponents' }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
