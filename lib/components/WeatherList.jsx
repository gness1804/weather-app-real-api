import React, { Component } from 'react';

export default class WeatherList extends React.Component {
  constructor(props) {
    super(props);
  }

  showWeatherData(data) {

    return(<div className="weather-card">
    <h2 className="weather-card-title">Time Period: {data.title}</h2>
    <img className="weather-card-img" src={data.icon_url} alt="Icon representing the weather for the day."/>
    <p className="weather-card-text">Forecast: {data.fcttext}</p>
    <p className="weather-card-text">Chance of Precipitation: {data.pop} percent.</p>
    </div>
    );
  } //end of showWeatherData

  render () {
    return (
      <ul>
        <li>{this.props.data.map(this.showWeatherData)}</li>
      </ul>
    );
  }
} //end of WeatherList