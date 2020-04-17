import React from "react";

import { StyleSheet, View, Text } from "react-native";

import Weather from "../component/Weather";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        ></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
