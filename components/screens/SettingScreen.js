import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

import TopBar from "../component/TopBar";

class SettingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.statusBar} /> */}
        {/* <TopBar title="Setting" /> */}
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Setting</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: "#fcfcfc",
    height: Constants.statusBarHeight,
  },
});

export default SettingScreen;
