const React = require('react');
const ReactDOM = require('react-dom');
const WeatherButton = require('./WeatherButton.jsx');

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

  getWeatherData() { //when they click on Get Weather button
    let that = this;
    let city = this.state.location.toUpperCase();
    let usState = this.state.usState;
    let urlAssignment = "http://api.wunderground.com/api/47fe8304fc0c9639/forecast/q/";
    let newAssignment = urlAssignment + usState + "/" + city + ".json";

    $.get(newAssignment, function (data) {
      that.setState({weather:data.forecast.txt_forecast.forecastday});
    });

    localStorage.setItem("location", JSON.stringify(this.state.location));
    localStorage.setItem("usState", JSON.stringify(this.state.usState));

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
          <figure>
            <img src="images/wu-logo.jpg"/>
            <figcaption>Data courtesy of Weather Underground.</figcaption>
          </figure>
        </header>
        <fieldset>
          <label htmlFor="current-location-input" className="fieldset-left-item">Your City:
          <input id="current-location-input" type="text" placeholder="City" list="current-loc-list" onChange={this.handleInputChange.bind(this)} value={this.state.location} onKeyDown={this.enterFunctionality.bind(this)}>
          </input>
          <datalist id="current-loc-list">
            <option value="Atlanta"></option>
            <option value="Boston"></option>
            <option value="Chicago"></option>
            <option value="Denver"></option>
            <option value="Detroit"></option>
            <option value="Houston"></option>
            <option value="Los Angeles"></option>
            <option value="New Orleans"></option>
            <option value="San Francisco"></option>
            <option value="St Louis"></option>
          </datalist>
          </label>
          <label htmlFor="us-state-input" className="fieldset-right-item">Your State:
            <input id="us-state-input" type="text" placeholder="State" list="us-state-list" onChange={this.handleInputChangeState.bind(this)} value={this.state.usState} onKeyDown={this.enterFunctionality.bind(this)}>
            </input>
            <datalist id="us-state-list">
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
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
