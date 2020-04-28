import { Component } from "react";

export default class POST extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      header: this.props.header,
      body: this.props.body,
    };
  }
}
