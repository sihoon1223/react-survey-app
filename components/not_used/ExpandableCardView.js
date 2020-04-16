import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
// import CardView from "react-native-cardview";

class ExpandableCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*
    TODO: 부서를 선택했을 때 다음 동작을 기술
  */
  show_Selected_Category = (item) => {
    //Alert.alert(item);
    alert(item);
  };

  render() {
    const layout_height = this.props.item.expanded ? null : 0;
    return (
      <View style={styles.MainContainer}>
        {/* <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={{ backgroundColor: "#fcfcfc" }}
        > */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.category_View}
        >
          <Text style={styles.category_Text}>{this.props.item.name} </Text>
          <Image
            source={{
              uri:
                "https://reactnativecode.com/wp-content/uploads/2019/02/arrow_right_icon.png",
            }}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <View style={{ height: layout_height, overflow: "hidden" }}>
          {this.props.item.children.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.sub_Category_Text}
              onPress={this.show_Selected_Category.bind(this, item.name)}
            >
              <Text> {item.name} </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* </CardView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    //paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#fcfcfc",
    paddingBottom: 10,
  },

  category_View: {
    marginVertical: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fcfcfc",
  },

  iconStyle: {
    width: 30,
    height: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    tintColor: "#4f44b4",
  },

  sub_Category_Text: {
    fontSize: 18,
    color: "#828282",
    padding: 10,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
  },

  category_Text: {
    textAlign: "left",
    color: "black",
    fontSize: 18,
    padding: 10,
  },
});

export default ExpandableCardView;
