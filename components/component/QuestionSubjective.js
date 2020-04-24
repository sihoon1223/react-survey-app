import React, { Component } from "react";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default class QuestionRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      type: props.type,
      question: props.question,
      text: "",
      required: props.required,
      _setAnswerDatas: props._setAnswerDatas,
    };
  }

  render() {
    const radioButtons = [];

    // console.log(radioButtons);
    // this.state.onSelect(this.state.id, radioButtons[0].props.value);
    return (
      <View
        style={{
          paddingBottom: 20,
        }}
      >
        <Text style={styles.opinion}>{this.state.question}</Text>
        <TextInput
          style={styles.inputArea}
          placeholder="의견을 작성해주세요."
          keyboardType="default"
          multiline
          onBlur={() =>
            this.state._setAnswerDatas(this.state.id, this.state.text)
          }
          blurOnSubmit={false}
          returnKeyType="next"
          onChangeText={(text) => {
            this.state.text = text;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title_container: {
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderBottomColor: "gray",
    borderTopColor: "gray",
  },
  title_text: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  radio_group: {
    marginTop: 5,
    marginBottom: 5,
  },
  radio_button: {
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  radio_button_text: {
    fontSize: 13.5,
    width: "95%",
  },
  radio_button_text_container: {
    // flex: 1,
    // // width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});
