const React = require('react');
const ReactDOM = require('react-dom');
const WeatherButton = require('./WeatherButton.jsx');
import InputArea from './InputArea';

class App extends React.Component {
  constructor(props) {
    super(props);
    
  } //end of constructor

  componentDidMount(){

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

ReactDOM.render(<App title='Weathrly' />, document.querySelector('#application'));
