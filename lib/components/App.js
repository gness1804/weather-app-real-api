import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import InputArea from './InputArea';

const App = () => {
  return (
    <div className="GetWeather">
      <Header />
      <InputArea />
    </div>
  );
};

ReactDOM.render(<App title="Weathrly'" />, document.querySelector('#application'));
