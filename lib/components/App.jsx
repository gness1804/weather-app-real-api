const React = require('react');
const ReactDOM = require('react-dom');
const WeatherButton = require('./WeatherButton.jsx');
import InputArea from './InputArea';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      location: "Denver",
      usState: "CO",
    };
  }

  componentDidMount(){
    let that = this;
    const mostRecentLocation = JSON.parse(localStorage.getItem("location"));
    this.setState({location: mostRecentLocation ? mostRecentLocation : "Denver"});
    const mostRecentUSState = JSON.parse(localStorage.getItem("usState"));
    this.setState({usState: mostRecentUSState ? mostRecentUSState : "CO"});
  } //end of componentDidMount

  render () {
    return (
      <div className="GetWeather">
        <header>
          <h1>Welcome to -Weathrly-</h1>
          <h3>Your World<br></br>Your Weather</h3>
          <a className="wu-logo-link-wrapper" href="https://www.wunderground.com/" target="_blank">
            <figure className="wu-logo-container">
              <img src="images/wu-logo.jpg"/>
              <figcaption className="wu-logo-caption-text">Data courtesy of Weather Underground.</figcaption>
            </figure>
          </a>
        </header>
        <InputArea/>

      </div> //end of GetWeather
    );
  }
} //end of App

class WeatherList extends React.Component {
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

ReactDOM.render(<App title='Weathrly' />, document.querySelector('#application'));
