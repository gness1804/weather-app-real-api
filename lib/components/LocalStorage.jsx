const React = require('react');
const ReactDOM = require('react-dom');

componentDidMount(){
  const mostRecentLocation = JSON.parse(localStorage.getItem("location"));
  this.setState({location: mostRecentLocation ? mostRecentLocation : "Denver"})
} //end of componentDidMount
