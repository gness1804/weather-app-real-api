import React, { Component } from 'react';

export default class WeatherCard extends Component {
  constructor() {
    super();

  } //end of constructor

  render() {
    return(
      <div className="weather-card">
      <h2 className="weather-card-title">Time Period: {this.props.time}</h2>
      <img className="weather-card-img" src={this.props.icon} alt="Icon representing the weather for the day."/>
      <p className="weather-card-text">Forecast: {this.props.forecast}</p>
      <p className="weather-card-text">Chance of Precipitation: {this.props.precipitation} percent.</p>
      </div>
    );
  }

} //end of WeatherCard
