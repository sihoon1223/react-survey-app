import React from "react";

import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";

import TopBar from "../component/TopBar";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.statusBar} /> */}
        {/* <TopBar title="Home" /> */}
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Home</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#fcfcfc",
    height: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
  },
});
