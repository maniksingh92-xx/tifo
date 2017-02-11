import React, { Component } from 'react';
import c3 from 'c3';

export default class StatGauge extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    c3.generate(this.props.options);
  }

  render() {
    return <div id={this.props.options.data.columns[0][0]}></div>
  }
}