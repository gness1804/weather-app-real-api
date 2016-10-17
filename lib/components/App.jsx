const React = require('react');
const ReactDOM = require('react-dom');
const WeatherButton = require('./WeatherButton.jsx');
// require('./LocalStorage.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      location: "Denver",
      usState: "Colorado",
    };
  }

  componentDidMount(){
    let that = this;
    const mostRecentLocation = JSON.parse(localStorage.getItem("location"));
    this.setState({location: mostRecentLocation ? mostRecentLocation : "Denver"});
  } //end of componentDidMount

  getWeatherData() { //when they click on Get Weather button
    let that = this;
    let city = this.state.location.toUpperCase();
    let usState = this.state.usState;
    let urlAssignment = "http://api.wunderground.com/api/47fe8304fc0c9639/forecast/q/";
    // http://api.wunderground.com/api/47fe8304fc0c9639/forecast/q/il/chicago.json
    let newAssignment = urlAssignment + usState + "/" + city + ".json";

    $.get(newAssignment, function (data) {
      that.setState({weather:data.forecast.txt_forecast.forecastday});
    });

    localStorage.setItem("location", JSON.stringify(this.state.location));

    // function changeWindow(city) {
    //   let urlAssignment = "https://www.google.com/search?q=weather&ie=utf-8&oe=utf-8#q=weather+";
    //   let newAssignment = urlAssignment + city;
    //   window.open(newAssignment);
    // }

  } //end of getWeatherData

  handleInputChange(e) { //when they enter data into location field
    this.setState({location: e.target.value});
  }

  handleInputChangeState(e){ //when they enter data into us state field
    this.setState({usState: e.target.value});
  }

  enterFunctionality(e) {
    let that = this;
    if (e.keyCode === 13) {
      that.getWeatherData();
    }
  }

  render () {
    return (
      <div className="GetWeather">
        <header>
          <h1>Welcome to -Weathrly-</h1>
          <h3>Your World<br></br>Your Weather</h3>
        </header>
        <fieldset>
                  <label htmlFor="current-location-input" className="fieldset-left-item">Your City:
                  <input id="current-location-input" type="text" placeholder="City" list="current-loc-list" onChange={this.handleInputChange.bind(this)} value={this.state.location} onKeyDown={this.enterFunctionality.bind(this)}>
                  </input>
                  <datalist id="current-loc-list">
                    <option value="San Diego"></option>
                    <option value="Denver"></option>
                    <option value="San Francisco"></option>
                    <option value="Castle Rock"></option>
                  </datalist>
                  </label>
                  <label htmlFor="us-state-input" className="fieldset-right-item">Your State:
                  <input id="us-state-input" type="text" placeholder="State" list="us-state-list" onChange={this.handleInputChangeState.bind(this)} value={this.state.usState} onKeyDown={this.enterFunctionality.bind(this)}>
                  </input>
                  <datalist id="us-state-list">
                    //us states
                  </datalist>
                  </label>
                </fieldset>
            <WeatherButton id = 'get-weather-button' text="Get Weather" handleClick={()=>this.getWeatherData()} />
            <WeatherList data={this.state.weather} city={this.state.location}/>

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
    <p>Time Period: {data.title}</p>
    <img src={data.icon_url} alt="Icon representing the weather for the day."/>
    <p>Forecast: {data.fcttext}</p>
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
