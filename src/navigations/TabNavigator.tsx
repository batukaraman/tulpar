import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '@screens/HomeScreen';
import CreateScreen from '@screens/CreateScreen';
import ProfileScreen from '@screens/ProfileScreen';
import {colors} from '@constants/theme';
import {Text} from 'react-native';
import MainHeader from '@components/MainHeader';

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: 'Ana Sayfa',
    screen: HomeScreen,
    iconName: 'home-outline',
    activeIconName: 'home',
  },
  {
    name: 'Oluştur',
    screen: CreateScreen,
    iconName: 'add-circle-outline',
    activeIconName: 'add-circle',
  },
  {
    name: 'Profil',
    screen: ProfileScreen,
    iconName: 'person-outline',
    activeIconName: 'person',
  },
];

function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        header: () => <MainHeader />,
      }}>
      {tabs.map(({name, iconName, activeIconName, screen}, index) => (
        <Tab.Screen
          key={index}
          name={name}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? colors.primary : colors.black,
                  fontSize: 10,
                }}>
                {name}
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? activeIconName : iconName}
                size={28}
                color={focused ? colors.primary : colors.black}
              />
            ),
          }}
          component={screen}
        />
      ))}
    </Tab.Navigator>
  );
}

export default TabNavigator;
