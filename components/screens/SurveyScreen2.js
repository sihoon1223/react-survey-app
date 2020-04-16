import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import Accordian from "../component/Accordian";

export default class SurveyScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree_id: this.props.navigation.state.params.degree_id, //설문조사 회차 id
      dept_id: null,
      surveyDatas: [], //본부별로 저장
      activeSections: [],
    };

    this._changeFromChild = this._changeFromChild.bind(this);
  }

  //자식에게서 값을 받아와 상태변경
  _changeFromChild(id) {
    this.setState = {
      dept_id: id,
    };
    this._goToNextStep();
  }

  //SurveyScreen3(routeName:Survey_step3 로 네비게이팅)
  _goToNextStep() {
    this.props.navigation.navigate("Survey_step3", {
      degree_id: this.state.degree_id,
      dept_id: this.state.dept_id,
    });
  }

  _getSurveyData = async () => {
    const url = new URL("http://61.73.147.176/api/v1/department");
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      this.setState({
        surveyDatas: responseJson,
      });
    } catch (error) {
      console.error("_getSurveyData", error);
    }
  };

  componentDidMount() {
    this._getSurveyData();
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
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            {this.state.surveyDatas.map((item, key) =>
              /*<ExpandableCardView
                key={item.id}
                // onClickFunction={this._updateLayout.bind(this, key)}
                item={item}
              />*/
              this.renderAccordians(item)
            )}
          </ScrollView>
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
