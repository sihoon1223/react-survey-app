import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  ScrollView,
  findNodeHandle,
} from "react-native";
// import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Question from "../component/Question";

export default class SurveyScreen4 extends Component {
  constructor(props) {
    super(props);
    // this._getSurveyQuestionList();
    this.state = {
      isLoading: false,
      refreshing: false,
      QuestionDatas: "",
      AnswerDatas: [],
    };
  }

  componentDidMount() {
    this._getSurveyQuestionList();
  }

  _getSurveyQuestionList = async () => {
    let url = "http://61.73.147.176/api/v1/survey/question/1";
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      this.setState({
        QuestionDatas: responseJson,
      });
    } catch (error) {
      console.error("_getSurveyQuestionList", error);
    }
  };

  onRefresh = () => {
    this._getSurveyQuestionList();
  };

  _setValue = (questionId, value) => {
    var mergeJSON = require("merge-json");
    var ans = {
      [`ans-${questionId}`]: value,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);
  };

  _renderQuestion = ({ item }) => {
    const { id, degree_id, type, question, children } = item;

    if (type === "radio") {
      return (
        <View>
          <Question
            id={id}
            degree_id={degree_id}
            type={type}
            question={question}
            children={children}
            onSelect={this._setValue}
          ></Question>
        </View>
      );
    }
  };

  _handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      //dismissKeyboard();
      // Keyboard.dismiss();
    }
  };
  _submitAction = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>설문조사</Text>
        <View style={styles.survey_container}>
          <Text style={styles.text}>Step4. 설문 답변을 입력해주세요.</Text>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
              width: null,
              height: null,
            }}
          >
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              <FlatList
                data={this.state.QuestionDatas}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={20}
                onEndReachedThreshold={1}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                renderItem={this._renderQuestion}
              />

              <View
                style={{
                  paddingBottom: 20,
                }}
              >
                <Text style={styles.opinion}>기타의견</Text>
                <TextInput
                  style={styles.inputArea}
                  placeholder="기타의견을 작성해주세요."
                  keyboardType="default"
                  multiline
                  blurOnSubmit={false}
                  returnKeyType="done"
                />
              </View>
              <Button onPress={this._submitAction} title="제출하기" />
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fcfcfc",
  },
  survey_container: {
    flex: 1,
    height: 100,
    padding: "5%",
  },
  title: {
    fontSize: 20,
    paddingTop: "5%",
    paddingLeft: "5%",
    fontWeight: "bold",
  },
  text: {
    paddingBottom: 10,
  },
  opinion: {
    fontWeight: "bold",
    marginTop: 10,
  },
  inputArea: {
    marginTop: 10,
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
  },
});
