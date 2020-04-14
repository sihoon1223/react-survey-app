import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./components/screens/HomeScreen";
import SurveyScreen from "./components/screens/SurveyScreen";
import SettingScreen from "./components/screens/SettingScreen";
import DetailScreen from "./components/screens/DetailScreen";

// 헤더를 세팅한 후 반환
const Header = (props) => {
  return (
    <View style={styles.header_container}>
      <Text style={styles.header_title}>{props.title}</Text>
    </View>
  );
};

/*
Survey에 관련된 스택네비게이터
TODO: 추후에 파일 별도로 분리 필요
*/

const App = createStackNavigator(
  {
    Survey_step1: {
      screen: SurveyScreen,
      navigationOptions: ({ navigation }) => ({
        // headerTitle: () => {
        //   const route = navigation.state.routes[navigation.state.index];
        //   const routeName = route.routeName;
        //   return <Header title={routeName} />;
        // },
      }),
    },
    Survey_step2: {
      screen: DetailScreen,
      navigationOptions: ({ navigation }) => ({
        // headerTitle: () => {
        //   const routeName = navigation.state.routeName;
        //   return <Header title={routeName} />;
        // },
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#fcfcfc",
        borderBottomWidth: 1,
        borderBottomColor: "#d3d3d3",
      },
      headerTintColor: "black",
      headerTitle: "설문조사",
    },
    initialRouteName: "Survey_step1",
  }
);

const MainStack = createBottomTabNavigator(
  {
    Survey: {
      screen: App,
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

const styles = StyleSheet.create({
  header_container: { alignItems: "center" },
  header_title: { fontSize: 18, color: "black", fontWeight: "bold" },
});

export default createAppContainer(MainStack);

/*const AppContainer = createAppContainer(MainStack);
// export default App;
//asdfasdf

const App = () => {
  return <AppContainer />;
};

export default App;*/
