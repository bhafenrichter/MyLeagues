import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './../screens/HomeScreen';
import LeagueScreen from './../screens/LeagueScreen';
import ProfileScreen from './../screens/ProfileScreen';
import AddPlayerScreen from './../screens/AddPlayerScreen';
import CreateLeagueScreen from './../screens/CreateLeagueScreen';

const AppStack = createStackNavigator(
    { 
      Home: HomeScreen,
      League: LeagueScreen,
      Profile: ProfileScreen,
      CreateLeague: CreateLeagueScreen,
      AddPlayer: AddPlayerScreen,
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