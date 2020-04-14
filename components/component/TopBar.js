import React from "react";
import { StyleSheet, Text, View } from "react-native";

class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title || "Title"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    color: "#000",
    fontWeight: "bold",
  },
  container: {
    alignSelf: "stretch",
    height: 40,
    flexDirection: "row", // row
    backgroundColor: "#fcfcfc",
    alignItems: "center",
    justifyContent: "center", // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
  },
});

export default TopBar;
