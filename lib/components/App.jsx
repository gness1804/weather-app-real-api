const React = require('react');
const ReactDOM = require('react-dom');
const WeatherButton = require('./WeatherButton.jsx');
// require('./LocalStorage.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      location: "Denver"
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
    if (city === "DENVER") {
      $.get("http://weatherly-api.herokuapp.com/api/weather/denver", function (data) {
        that.setState({weather:data});
      });
    }
    else if (city === "SAN DIEGO") {
      $.get("http://weatherly-api.herokuapp.com/api/weather/san-diego", function (data) {
        that.setState({weather:data});
      });
    }
    else if (city === "CASTLE ROCK") {
      $.get("http://weatherly-api.herokuapp.com/api/weather/castle-rock", function (data) {
        that.setState({weather:data});
      });
    }
    else if (city === "SAN FRANCISCO") {
      $.get("http://weatherly-api.herokuapp.com/api/weather/san-fransico", function (data) {
        that.setState({weather:data});
      });
    }
    else {
      changeWindow(city);
    }

    localStorage.setItem("location", JSON.stringify(this.state.location));

    function changeWindow(city) {
      let urlAssignment = "https://www.google.com/search?q=weather&ie=utf-8&oe=utf-8#q=weather+";
      let newAssignment = urlAssignment + city;
      window.open(newAssignment);
    }

  } //end of getWeatherData

  handleInputChange(e) { //when they enter data into location field
    this.setState({location: e.target.value});
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
                  <label htmlFor="current-location-input" className="fieldset-left-item">Your Current Location:
                  <input id="current-location-input" type="text" placeholder="City" list="current-loc-list" onChange={this.handleInputChange.bind(this)} value={this.state.location} onKeyDown={this.enterFunctionality.bind(this)}>
                  </input>
                  <datalist id="current-loc-list">
                    <option value="San Diego"></option>
                    <option value="Denver"></option>
                    <option value="San Francisco"></option>
                    <option value="Castle Rock"></option>
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

        <p className='date'>{data.date}</p>
        <p className="weather-card-text1"> The weather will be {data.weatherType.type} with a high of {data.temp.high} and a low of {data.temp.low}.</p>
        <p className="weather-card-text2">There will be a {Math.floor(data.weatherType.chance * 100)} percent chance of this weather event happening.
      </p>
    </div>
    );
  }

  showExtremeWeather(data) {
    if (data.weatherType.scale === 3) {
      if (data.weatherType.type === "sunny") {
        return(<div className="warning sun">
        <p className='date'>{data.date}</p><p className="weather-card-text1">There will be extreme sun. </p>
          <p className="weather-card-text2">Take care and use plenty of sunscreen!
          </p>
        </div>);
      }
      else if (data.weatherType.type === "rain") {
        return(<div className='warning rain'>
        <p className='date'>{data.date}</p><p className="weather-card-text1">There will be a high chance of flooding and extreme rain. </p>
          <p className="weather-card-text2">Stay inside and don't drive if possible!
          </p>
        </div>);
      }
      else if (data.weatherType.type === "windy") {
        return(<div className='warning windy'>
          <p className='date'>{data.date}</p> <p className="weather-card-text1">There will be very high winds.</p>
          <p className="weather-card-text2">Stay indoors!</p>
        </div>);
      }
      else if (data.weatherType.type === "snow") {
        return(<div className='warning snow'>
        <p className='date'>{data.date}</p><p className="weather-card-text1">There will be heavy snow!
          </p>
          <p className="weather-card-text2">Take precautions!
          </p>
        </div>);
      }

    }
  }

  render () {
    return (
      <ul>
        <li>{this.props.data.map(this.showExtremeWeather)}</li>
        <li>{this.props.data.map(this.showWeatherData)}</li>
      </ul>
    );
  }
} //end of WeatherList

ReactDOM.render(<App title='Weathrly' />, document.querySelector('#application'));
