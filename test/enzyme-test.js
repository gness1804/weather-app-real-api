var expect = require('chai').expect;
const React = require('react');
const App   = require('../lib/components/App');
const WeatherButton = require('../lib/components/WeatherButton');
require('locus');
import {shallow, mount, render} from 'enzyme';

describe('WeatherButton.jsx should render the App', function() {
  it('should render the application', function () {
    const wrapper = shallow(<WeatherButton/>);
    expect(wrapper.contains(<App />)).to.be.true;
  });
});
