const React = require('react');
const ReactDOM = require('react-dom');

class WeatherButton extends React.Component {
  render () {

    return (
      <button className = "WeatherButton" id = {this.props.id} onClick={this.props.handleClick}>
        <span>{this.props.text}</span>
        </button>
    );
  }
} //end of WeatherButton

module.exports = WeatherButton;
