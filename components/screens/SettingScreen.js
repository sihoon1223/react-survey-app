import React from "react";
import { StyleSheet, Text, View } from "react-native";

class SettingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
});

export default SettingScreen;
