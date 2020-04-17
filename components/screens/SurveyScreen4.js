import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from "react-native";
// import { TextInput } from "react-native-gesture-handler";
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
    console.log(
      "degree_id",
      this.props.navigation.state.params.degree_id,
      "dept_id",
      this.props.navigation.state.params.dept_id,
      "service_id",
      this.props.navigation.state.params.service_id
    );
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
    /*
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState = {
          QuestionDatas: data,
        };
        console.log(data);
        console.log(this.state.QuestionDatas);
      });*/
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
    console.log(this.state.AnswerDatas);
  };

  _renderQuestion = ({ item }) => {
    const { id, degree_id, type, question, children } = item;
    // console.log(id);
    if (type === "radio") {
      return (
        <View style={styles.questionGroup}>
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
  _submitAction = () => {};

  render() {
    //this._getSurveyQuestionList();
    // console.log("start");
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>설문조사</Text>
        </View>
        <View style={styles.title}>
          <Text>Step4. 설문 답변을 입력해주세요.</Text>
        </View>
        <View style={styles.questionArea}>
          <FlatList
            data={this.state.QuestionDatas}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={20}
            onEndReachedThreshold={1}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            renderItem={this._renderQuestion}
          />
        </View>
        <View style={styles.bottom}>
          <Text>기타의견</Text>
          <TextInput style={styles.inputArea}></TextInput>
        </View>
        <Button onPress={this._submitAction} title="제출하기"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fcfcfc",
  },
  title: {
    marginBottom: 5,
  },
  bottom: {
    flex: 1,
  },
  questionArea: {
    flex: 4,
  },

  questionGroup: {
    backgroundColor: "#F8F8FF",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  inputArea: {
    height: "80%",
    borderColor: "green",
    borderWidth: 1,
  },
});
