import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './../screens/HomeScreen';
import LeagueScreen from './../screens/LeagueScreen';

const AppStack = createStackNavigator(
    { 
      Home: HomeScreen,
      League: LeagueScreen,
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