import React from "react";

import { View, Text } from "react-native";

import HomeScreen from "./components/screens/HomeScreen";
import SurveyScreen from "./components/screens/SurveyScreen";
import SettingScreen from "./components/screens/SettingScreen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

const MainStack = createBottomTabNavigator(
  {
    Survey: {
      screen: SurveyScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Setting: {
      screen: SettingScreen,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      swipeEnabled: true,
      adaptive: true,
      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = "ios-home";
        } else if (routeName === "Survey") {
          iconName = "ios-filing";
        } else if (routeName === "Setting") {
          iconName = "ios-settings";
        }
        return (
          <IconComponent
            style={{ paddingTop: 10 }}
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: "#4f44b4",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "#fcfcfc",
      },
    },
    initialRouteName: "Home",
  }
);

// const AppContainer = createAppContainer(MainStack);

// const App = () => {
//   return <AppContainer />;
// };

// export default App;
//asdfasdf

const App = createStackNavigator({
  TabNavigator: {
    screen: MainStack,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#fcfcfc",
        borderBottomWidth: 1,
        borderBottomColor: "#d3d3d3",
      },
      headerTintColor: "#000000",

      headerTitle: () => {
        const route = navigation.state.routes[navigation.state.index];
        const routeName = route.routeName;
        let title;
        if (routeName === "Home") {
          title = "Home";
        } else if (routeName === "Survey") {
          title = "KTNET 설문조사 서비스";
        } else if (routeName === "Setting") {
          title = "Setting";
        }

        return <Header title={title} />;
      },
    }),
  },
});

//make up header
const Header = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>
        {props.title}
      </Text>
    </View>
  );
};

export default createAppContainer(App);
// ({navigation}) => {
//   headerStyle: {
//     backgroundColor: "#fcfcfc",
//     borderBottomWidth: 1,
//     borderBottomColor: "#d3d3d3",
//   },
//   headerTintColor: "#000000",

// }
// headerTitle: ({ navigation }) => {
//   const { routeName } = navigation.state;
//   let title = Text;
//   if (routeName === "Home") {
//     title = "Home";
//   } else if (routeName === "Survey") {
//     title = "KTNET 설문조사 서비스";
//   } else if (routeName === "Setting") {
//     title = "Setting";
//   }
//   return <Header title={title} />;
// },
