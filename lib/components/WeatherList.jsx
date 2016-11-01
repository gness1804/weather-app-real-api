import React, { Component } from 'react';
import WeatherCard from './WeatherCard';

export default class WeatherList extends React.Component {
  constructor(props) {
    super(props);
  }

  showWeatherData(data) {

    return(<div>
      <WeatherCard time={data.title} icon={data.icon_url} forecast={data.fcttext} precipitation={data.pop} />
    </div>)

  } //end of showWeatherData

  render () {
    return (
      <ul>
        <li>{this.props.data.map(this.showWeatherData)}</li>
      </ul>
    );
  }
} //end of WeatherList
