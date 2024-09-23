import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '@screens/SearchScreen';
import MainHeader from '@components/MainHeader';

const Stack = createNativeStackNavigator();

function MainNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          options={{
            headerShown: false,
          }}
          component={TabNavigator}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{headerShadowVisible: false, headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
