import React from 'react';

import './App.css';

function App() {
  return (
    <>
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              ng-click="isNavCollapsed = !isNavCollapsed"
            >
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <span id="title" className="navbar-brand">
              BookStore App
            </span>
          </div>
          <div
            className="collapse navbar-collapse"
            uib-collapse="isNavCollapsed"
          >
            <ul className="nav navbar-nav">
              <li>
                <a href="#" />
              </li>
              <li>
                <a href="#" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid mr-10 app-container">
        the router content goes here
        <i className="fa fa-chevron-right ml10" />
      </div>

      <div id="footer" className="navbar-fixed-bottom">
        <div className="container-fluid">
          <p className="text-center text-muted" />
          <p className="text-center text-muted" />
        </div>
      </div>
    </>
  );
}

export default App;
