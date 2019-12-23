import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './../screens/HomeScreen';
import LeagueScreen from './../screens/LeagueScreen';
import ProfileScreen from './../screens/ProfileScreen';

const AppStack = createStackNavigator(
    { 
      Home: HomeScreen,
      League: LeagueScreen,
      Profile: ProfileScreen,
    }
);
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      // Auth: AuthStack,
    },
  )
);