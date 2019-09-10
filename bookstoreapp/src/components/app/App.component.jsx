import React from 'react';
import Home from '../home/Home.component';
import BookDetails from '../book-details/BookDetails.component';
import BookActions from '../book-actions/BookActions.components';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/bookDetails/:bookId" component={BookDetails} />
          <Route path="/bookActions/:bookId" component={BookActions} />
          {/*<Route component={NoMatch} /> */}
        </Switch>
      </div>

      <div id="footer" className="navbar-fixed-bottom">
        <div className="container-fluid">
          <p className="text-center text-muted" />
          <p className="text-center text-muted" />
        </div>
      </div>
    </Router>
  );
};

export default App;
