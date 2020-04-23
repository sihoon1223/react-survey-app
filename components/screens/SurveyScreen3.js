import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Accordian from "../component/Accordian";
import Get from "../module/Get";

const SERVICE_LIST_URL = "http://61.73.147.176/api/v1/service";

class SurveyScreen3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      degree_id: this.props.navigation.state.params.degree_id, //설문조사 회차 id
      dept_id: this.props.navigation.state.params.dept_id,
      service_id: null,
      surveyDatas: [],
      activeSections: [],
    };

    this._changeFromChild = this._changeFromChild.bind(this);
  }

  //자식에게서 값을 받아와 상태변경
  _changeFromChild(id) {
    this.state.service_id = id;
    this._goToNextStep();
  }

  _dataFromChild = (datas) => {
    //콜백메서드 등록
    this.setState({ surveyDatas: datas, isLoading: false });
  };

  //SurveyScreen4(routeName:Survey_step4 로 네비게이팅)
  _goToNextStep() {
    this.props.navigation.navigate("Survey_step4", {
      degree_id: this.state.degree_id,
      dept_id: this.state.dept_id,
      service_id: this.state.service_id,
    });
  }

  _getSurveyData = async () => {
    const url = new URL("http://61.73.147.176/api/v1/service");
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
          <Text style={styles.text}>STEP 3. 담당 업무를 선택해주세요.</Text>
          {this.state.isLoading ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator size="small" color="gray" />
              <Get url={SERVICE_LIST_URL} dataFromChild={this._dataFromChild} />
            </View>
          ) : (
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

export default SurveyScreen3;
