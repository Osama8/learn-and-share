import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import Home from "./components/home";
import Search from "./components/search";
import History from "./components/history";
import Profile from "./components/profile";
import Info from "./components/info";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCRo7aEy3Myk4mMrKCzLLmpbJM4HNTnp-c",
  authDomain: "learnandteach-750e3.firebaseapp.com",
  databaseURL: "https://learnandteach-750e3.firebaseio.com",
  projectId: "learnandteach-750e3",
  storageBucket: "learnandteach-750e3.appspot.com",
  messagingSenderId: "1016223804725",
  appId: "1:1016223804725:web:cd31773c5ff94c4f"
};

const homeStack = createStackNavigator({
  home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  info: Info
});

const searchStack = createStackNavigator({
  search: {
    screen: Search,
    navigationOptions: {
      header: null
    }
  },
  searchInfo: Info
});

const tabs = createBottomTabNavigator({
  HomeStack: {
    screen: homeStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-home" color={tintColor} size={24} />
      )
    })
  },

  Search: {
    screen: searchStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-search" color={tintColor} size={24} />
      )
    })
  },
  // History: {
  //   screen: History,
  //   navigationOptions: () => ({
  //     tabBarIcon: ({ tintColor }) => (
  //       <Ionicons name="ios-refresh" color={tintColor} size={24} />
  //     )
  //   })
  // },

  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-contact" color={tintColor} size={24} />
      )
    })
  }
});

const all = createSwitchNavigator({
  Main: tabs,
  Login: Login,
  SignUp: SignUp
});

if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}

const App = createAppContainer(all);

export default App;
