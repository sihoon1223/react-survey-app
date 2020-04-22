import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

// npm install react-native-animated-loader
// npm install lottie-react-native;
// react-native link lottie-react-native
export default function loading() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/*  <Text style={styles.text}>Loading</Text>*/}
      {
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={styles.lottie}
          speed={1}
        ></AnimatedLoader>
      }
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
