import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import App from './components/app/App.component';

ReactDOM.render(<App />, document.getElementById('root'));

//the below code enables HMR comment after dev changes
if (module.hot) {
    module.hot.accept('./components/app/App.component', () => {
      const NextApp = require('./components/app/App.component').default;
      ReactDOM.render(<NextApp />, document.getElementById('root'));
    });
  }
