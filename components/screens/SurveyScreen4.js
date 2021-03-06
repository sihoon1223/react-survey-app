import React, { Component } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import Get from "../module/Get";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import QuestionRadio from "../component/QuestionRadio";

import OtherComment from "../component/OtherComment";
import QuestionSubjective from "../component/QuestionSubjective";
// const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const QUESTION_LIST_URL = `${
  require("../../assets/setting/config.json").url
}survey/question/`;
export default class SurveyScreen4 extends Component {
  TESTURL = "";
  constructor(props) {
    super(props);
    // this._getSurveyQuestionList();
    this.state = {
      isLoading: true,
      refreshing: false,
      QuestionDatas: "",
      AnswerDatas: [],
      otherComment: "",
      degree_id: this.props.navigation.state.params.degree_id,
      department_id: this.props.navigation.state.params.dept_id,
      service_id: this.props.navigation.state.params.service_id,
      QuestionScrollRef: [],
      QuestionisAnswered: [],
    };
    this.flatListRef = "";
    this.TESTURL = QUESTION_LIST_URL + this.state.degree_id;
    console.log(this.TESTURL);
  }

  _setAnswerCheck = (isReq, questionId) => {
    var mergeJSON = require("merge-json");

    this.state.QuestionisAnswered = mergeJSON.merge(
      this.state.QuestionisAnswered,
      { [`${questionId}`]: isReq }
    );
    console.log(this.state.QuestionisAnswered);
  };

  _setAnswerDatas = (questionId, text) => {
    var mergeJSON = require("merge-json");
    var ans = {
      [`ans-${questionId}`]: text,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);
    console.log(this.state.AnswerDatas);
  };

  _dataFromChild = (datas) => {
    //콜백메서드 등록
    this.setState({ QuestionDatas: datas, isLoading: false });
    //console.log(this.state.QuestionDatas);
  };

  _ChangeOtherComment = (text) => {
    this.state.otherComment = text;
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
    console.log(item);
    const { id, degree_id, type, required, question, children } = item;

    if (type === "radio") {
      return (
        <View>
          <QuestionRadio
            id={id}
            degree_id={degree_id}
            type={type}
            required={required}
            question={question}
            children={children}
            onSelect={this._setValue}
            reqCheck={this._setAnswerCheck}
          ></QuestionRadio>
        </View>
      );
    } else if (type === "text") {
      return (
        <View>
          <QuestionSubjective
            id={id}
            degree_id={degree_id}
            type={type}
            required={required}
            question={question}
            _setAnswerDatas={this._setAnswerDatas}
            reqCheck={this._setAnswerCheck}
          ></QuestionSubjective>
        </View>
      );
    } else {
    }
  };
  _submitAction = async () => {
    console.log("호출2");
    const firstkey = Object.keys(this.state.QuestionisAnswered)[0];

    for (let item in this.state.QuestionisAnswered) {
      // console.log(item);

      const index = item - firstkey;

      if (this.state.QuestionisAnswered[item] === false) {
        //alert("필수 항목을 입력해주세요"); //이유는 모르겠지만 alert 때문에 랜더링이 2번되서 호출 2번함;
        console.log("호출");
        this.flatListRef.scrollToIndex({
          animated: true,
          index: index,
        });
        // console.log(index);
        return;
      }
      // if (this.state.QuestionisAnswered[0] === false) {
      //   this.flatListRef.scrollToIndex({ animated: true, index: item });
      //   console.log(this.state.QuestionisAnswered[item] + " " + item);
      //   alert("필수 항목을 입력해주세요");
      //   return;
      // }
    }

    const url = new URL("http://61.73.147.176/api/v1/survey");

    let headers = {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    };
    var mergeJSON = require("merge-json");

    var ans = {
      [`memo`]: this.state.otherComment,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);

    // console.log(this.state.AnswerDatas);

    // for (let item in this.state.AnswerDatas) {
    //   console.log(this.state.AnswerDatas[item]);
    // }

    // this.state.AnswerDatas.map((item, key) => {
    //   console.log(item);
    // });
    // this.state.AnswerDatas.map((item, key) => {});

    // for (let i = 0; i < this.state.AnswerDatas.length; i++) {
    //   console.log(this.state.AnswerDatas[i]);
    // }

    let body = {
      degree_id: this.state.degree_id,
      department_id: this.state.department_id,
      service_id: this.state.service_id,
      // "ans-*": this.state.AnswerDatas,
    };
    console.log(body);
    body = mergeJSON.merge(body, this.state.AnswerDatas);
    console.log(body);

    // const axios = require("axios");

    // axios.post("http://localhost:3000/users/", body).then((response) => {
    //   console.log(response);
    // });

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),

      // mode: "cors",
      //mode: "no-cors",
    })
      .then(function (response) {
        if (!response.ok) {
          console.log(response);
          throw Error(response);
        }
        return response;
      })
      .then(function (response) {
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });

    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: headers,
    //     body: body,
    //   });
    //   const responseJson = response.json();
    //   console.log(responseJson);
    //   // .then((response) => response.json())
    //   // .then((json) => console.log(json));

    //   alert("설문조사가 완료되었습니다.");
    //   this.props.navigation.replace("Survey_step1");
    // } catch (error) {
    //   console.log(error);
    //   alert("설문 저장 도중 오류가 발생하였습니다. 관리자에게 문의해주세요.");
    // }
  };

  _focusTextInput = () => {
    console.log("_focusTextInput");
  };

  _blurTextInput = () => {
    console.log("_blurTextInput");
    this.scrollRef.scrollToEnd();
  };
  render() {
    //console.log(this.state.isLoading);
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" color="gray" />
        <Get url={this.TESTURL} dataFromChild={this._dataFromChild} />
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>설문조사</Text>
        <View style={styles.survey_container}>
          <Text style={styles.text}>Step4. 설문 답변을 입력해주세요.</Text>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: "space-around",
              // alignItems: "center",
              width: null,
              height: null,
            }}
          >
            <FlatList
              data={this.state.QuestionDatas}
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={20}
              onEndReachedThreshold={1}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              style={{
                overflowX: "hidden",
              }}
              renderItem={this._renderQuestion}
              // getItemLayout={(data, index) => {
              //   console.log(data + " " + index);
              // }}
              ListFooterComponent={
                <OtherComment
                  _submitAction={this._submitAction}
                  _ChangeOtherComment={this._ChangeOtherComment}
                />
              }
            />
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
    textAlignVertical: "top",
  },
});
