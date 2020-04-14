import React, { Component } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";

import ExpandableCardView from "../component/ExpandableCardView";

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree_id: this.props.navigation.state.params.degree_id, //설문조사 회차 id
      surveyDatas: [], //본부별로 저장
      expanded: false,
    };
  }

  _updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = [...this.state.surveyDatas];
    array[index]["expanded"] = !array[index]["expanded"];

    this.setState(() => {
      return {
        surveyDatas: array,
      };
    });
  };

  _getSurveyData = async () => {
    const url = new URL("http://61.73.147.176/api/v1/department");
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      this.setState({
        surveyDatas: responseJson,
      });
    } catch (error) {}
  };

  componentDidMount() {
    this._getSurveyData();
  }

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
            {this.state.surveyDatas.map((item, key) => (
              <ExpandableCardView
                key={item.id}
                onClickFunction={this._updateLayout.bind(this, key)}
                item={item}
              />
            ))}
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
