import React, { Component } from "react";

import {
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";

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
      otherComment: "",
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
  _submitAction = async () => {
    const url = new URL("http://localhost/api/v1/survey");

    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    var mergeJSON = require("merge-json");
    var ans = {
      [`ans-${questionId}`]: this.state.otherComment,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);

    let body = {
      degree_id: this.state.degree_id,
      department_id: this.state.department_id,
      service_id: this.state.service_id,
      "ans-*": this.state.AnswerDatas,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });
      const responseJson = response.json();
      console.log(responseJson);
      // .then((response) => response.json())
      // .then((json) => console.log(json));
    } catch (error) {
      console.log(error);
    }
  };

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
          <TextInput
            placeholder="기타의견"
            placeholderTextColor="grey"
            blurOnSubmit={false}
            mulitline={true}
            numberOfLines={10}
            onChange={(event) => {
              this.nativeEvent = event.nativeEvent;
            }}
            onChangeText={(text) => {
              this.state.otherComment = text;
            }}
            style={styles.inputArea}
          ></TextInput>
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
    justifyContent: "flex-start",
    height: "80%",
    borderColor: "green",
    borderWidth: 1,
    textAlignVertical: "top",
  },
});
