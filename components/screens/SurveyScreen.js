import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";

import SurveyItem from "../component/SurveyItem";
import LoadingScreen from "./LoadingScreen";
import Get from "../module/Get";

const SURVEY_LIST_URL = `${
  require("../../assets/setting/config.json").url
}survey/degree`;

class SurveyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false, //데이터를 새로고침해서 가져오는 중인지 판단
      isLoading: true,
      surveyDatas: [],
    };
  }

  //get 모듈을 통해 가져온 데이터를 스테이트에 세팅
  _dataFromChild = (datas) => {
    //콜백메서드 등록

    // this.setState({ surveyDatas: datas, isLoading: false }, () => {
    //   console.log("isLoading", this.state.isLoading);
    // });

    this.setState({ surveyDatas: datas, isLoading: false });
  };

  //새로고침시 작동하는 함수
  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      console.log("refreshing", this.state.refreshing);
    });
  };

  /* 
  onEndReached 함수가 실행 되면 기존 데이터에 추가적으로 데이터가져오기
  TODO : 데이터가 붙을 때 기존의 배열에서 더 붙게끔 바꿔야함, 상태관리도 필요 (서버에서 현재 페이지 처리 안함)
  */
  onEndReached = () => {
    this.setState((state) => ({
      surveyDatas: [...state.surveyDatas, ..._getSurveyData()],
    }));
  };

  //설문조사의 상태 (진행중,준비중,완료) 중 진행중일 경우를 확인한 후 SurveyScreen2(routeName:Survey_step2 로 네비게이팅)
  _goToNextStep(degree_id, period) {
    /*
    예시 
    this.props.navigation.replace("TabNavigator");
    this.props.navigation.navigate("Setting", {
      greeting: "Hallo",
    });
    */
    if (period == "ING") {
      this.props.navigation.navigate("Survey_step2", {
        degree_id: degree_id,
      });
    } else if (period == "BEFORE") {
      Alert.alert("알림", "투표가 준비중입니다.");
    } else {
      Alert.alert("알림", "이미 종료된 투표입니다.");
    }
  }

  _renderItem = ({ item }) => {
    const { id, start_date, end_date, survey_title, period } = item; // Destructuring

    return (
      // 터치 가능하게 하기
      <TouchableOpacity onPress={() => this._goToNextStep(id, period)}>
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>설문조사</Text>
        <View style={styles.survey_container}>
          <Text style={styles.text}>STEP 1. 설문조사를 선택해주세요.</Text>
          {this.state.isLoading || this.state.refreshing ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator size="small" color="gray" />
              <Get url={SURVEY_LIST_URL} dataFromChild={this._dataFromChild}>
                {(this.state.refreshing = false)}
              </Get>
            </View>
          ) : (
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
          )}
        </View>
      </View>
    );
  }
  //   {this.state.splash?(
  //     <LoadingScreen/>
  //   ):(<View style={styles.container}>
  //     <Text style={styles.title}>설문조사</Text>
  //     <View style={styles.survey_container}>
  //       <Text style={styles.text}>STEP 1. 설문조사를 선택해주세요.</Text>
  //       {this.state.isLoading || this.state.refreshing ? (
  //         <Get url={SURVEY_LIST_URL} dataFromChild={this._dataFromChild}>
  //           {(this.state.refreshing = false)}
  //         </Get>
  //         ) : (
  //         <FlatList
  //           data={this.state.surveyDatas}
  //           keyExtractor={(item, index) => index.toString()}
  //           initialNumToRender={20}
  //           //스크롤이 onEndReachedThreshold에 설정한 값에 도달하면 onEndReached 함수가 실행 (인피니티 스크롤
  //           onEndReachedThreshold={1}
  //           refreshing={this.state.refreshing}
  //           onRefresh={this.onRefresh}
  //           renderItem={this._renderItem}
  //         />
  //       )}
  //     </View>
  //   </View>

  //   )}
  // );
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
