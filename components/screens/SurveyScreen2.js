import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import Accordian from "../component/Accordian";
import Get from "../module/Get";

const DEPARTMENT_LIST_URL = "http://61.73.147.176/api/v1/department";

export default class SurveyScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      degree_id: this.props.navigation.state.params.degree_id, //설문조사 회차 id
      dept_id: null,
      surveyDatas: [], //본부별로 저장
      activeSections: [],
    };

    this._changeFromChild = this._changeFromChild.bind(this);
  }

  //자식에게서 값을 받아와 상태변경
  _changeFromChild = (id) => {
    this.state.dept_id = id;
    this._goToNextStep();
  };

  _dataFromChild = (datas) => {
    //콜백메서드 등록
    this.setState({ surveyDatas: datas, isLoading: false });
  };
  //SurveyScreen3(routeName:Survey_step3 로 네비게이팅)
  _goToNextStep() {
    this.props.navigation.navigate("Survey_step3", {
      degree_id: this.state.degree_id,
      dept_id: this.state.dept_id,
    });
  }

  renderAccordians = (item) => {
    const items = [];
    items.push(
      <Accordian
        title={item.name}
        data={item}
        key={item.id}
        changeFromChild={this._changeFromChild}
      />
    );
    return items;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>설문조사</Text>
        <View style={styles.survey_container}>
          <Text style={styles.text}>STEP 2. 소속 부서를 선택해주세요.</Text>
          {this.state.isLoading ? (
            <Get
              url={DEPARTMENT_LIST_URL}
              dataFromChild={this._dataFromChild}
            />
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              {this.state.surveyDatas.map((item, key) =>
                this.renderAccordians(item)
              )}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingTop: "5%",
    paddingLeft: "5%",
    fontWeight: "bold",
  },
  text: {
    paddingBottom: 10,
  },
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
});
