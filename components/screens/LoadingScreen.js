import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

export default function loading() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>로딩뷰입니다 허허</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체 공간 다 차지하고 싶으면 1!
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#FDF6AA",
  },
  text: {
    color: "#2c2c2c",
    fontSize: 20,
  },
});
