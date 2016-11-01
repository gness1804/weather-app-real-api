import React, { Component } from 'react';

export default class WeatherCard extends Component {
  constructor() {
    super();

  } //end of constructor

  render() {
    return(
      <div>{this.props.data}</div>
    );
  }

} //end of WeatherCard
