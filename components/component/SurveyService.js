import React, { Component } from "react";
import { Tex, View } from "react-native";

class SurveyService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
    };
  }
}
