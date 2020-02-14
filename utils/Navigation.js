import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './../screens/HomeScreen';
import LeagueScreen from './../screens/LeagueScreen';
import ProfileScreen from './../screens/ProfileScreen';
import AddPlayerScreen from './../screens/AddPlayerScreen';
import CreateLeagueScreen from './../screens/CreateLeagueScreen';
import AddGameScreen from './../screens/AddGameScreen';
import SelectPlayerScreen from './../screens/SelectPlayerScreen';
import LoginScreen from '../screens/LoginScreen';

const AppStack = createStackNavigator(
    { 
      Home: HomeScreen,
      League: LeagueScreen,
      Profile: ProfileScreen,
      CreateLeague: CreateLeagueScreen,
      AddPlayer: AddPlayerScreen,
      AddGame: AddGameScreen,
      SelectPlayer: SelectPlayerScreen,
    }
);
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack,
    },
  )
);