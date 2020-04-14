import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import Constants from "expo-constants";

import SurveyItem from "../component/SurveyItem";

class SurveyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      surveyDatas: [],
      id: null,
    };
  }

  onRefresh = () => {
    this._getSurveyData();
  };

  /* 
  onEndReached 함수가 실행 되면 기존 데이터에 추가적으로 데이터가져오기
  TODO : 데이터가 붙을 때 기존의 배열에서 더 붙게끔 바꿔야함, 상태관리도 필요
  */
  onEndReached = () => {
    this.setState((state) => ({
      surveyDatas: [...state.surveyDatas, ..._getSurveyData()],
    }));
  };

  _getSurveyData = async () => {
    const url = new URL("http://61.73.147.176/api/v1/survey/degree");

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

  //SurveyScreen2(routeName:Survey_step2 로 네비게이팅)
  _goToNextStep(id) {
    this.props.navigation.navigate("Survey_step2", {
      degree_id: id,
    });

    /*
    예시 
    this.props.navigation.replace("TabNavigator");
    this.props.navigation.navigate("Setting", {
      greeting: "Hallo",
    });
    */
  }

  _renderItem = ({ item }) => {
    const { id, start_date, end_date, survey_title, period } = item; // Destructuring

    return (
      // 터치 가능하게 하기
      <TouchableOpacity onPress={() => this._goToNextStep(id)}>
        <SurveyItem
          key={id}
          id={id}
          start_date={start_date}
          end_date={end_date}
          survey_title={survey_title}
          period={period}
        />
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this._getSurveyData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>설문조사</Text>
        <View style={styles.survey_container}>
          <Text style={styles.text}>STEP 1. 설문조사를 선택해주세요.</Text>
          <FlatList
            data={this.state.surveyDatas}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={20}
            //스크롤이 onEndReachedThreshold에 설정한 값에 도달하면 onEndReached 함수가 실행 (인피니티 스크롤
            onEndReachedThreshold={1}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#fcfcfc",
    height: Constants.statusBarHeight,
  },
  text: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    paddingTop: "5%",
    paddingLeft: "5%",
    fontWeight: "bold",
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

export default SurveyScreen;
