import React, { Component } from "react";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { StyleSheet, Text, View } from "react-native";
import { ThemeConsumer } from "react-native-elements";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      type: props.type,
      question: props.question,
      children: props.children,
      onSelect: props.onSelect,
    };
  }

  render() {
    const radioButtons = [];
    this.state.children.map((item, index) => {
      radioButtons.push(
        <RadioButton key={index} value={item.id}>
          <Text>{item.description}</Text>
        </RadioButton>
      );
    });
    console.log(radioButtons[0].props.value);
    this.state.onSelect(this.state.id, radioButtons[0].props.value);
    return (
      <View>
        <View style={styles.titleView}>
          <Text>{this.state.question}</Text>
        </View>

        <RadioGroup
          color="#9575b2"
          highlightColor="#ccc8b9"
          selectedIndex={0}
          onSelect={(value) => this.state.onSelect(this.state.id, value)}
        >
          {radioButtons}
        </RadioGroup>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleView: {
    borderBottomWidth: 1,
    borderTopWidth: 2,
    borderBottomColor: "gray",
    borderTopColor: "blue",
  },
});
