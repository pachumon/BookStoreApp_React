import React, { Component } from 'react';
import HomeTable from './HomeTable.component';
import { InvokeHttp } from '../../httpUtils/AjaxGateway';
import { ToastContainer } from 'react-toastr';

export default class Home extends Component {
  state = { books: [] };
  container;

  componentWillMount = () => {
    this.loadBookData();
  };

  componentWillUpdate = (nextProps, nextState) => {};

  loadBookData = () => {
    InvokeHttp(
      { method: 'GET', url: `http://localhost:3600/books` },
      response => this.setState({ books: [...response] })
    );
  };

  removeBookInfo = bookID => {
    console.log(bookID);
    InvokeHttp(
      {
        method: 'DELETE',
        url: `http://localhost:3600/books/${bookID}`
      },
      response => {
        this.container.success(`Book has been Removed`, ``, {
          closeButton: true
        });
        this.loadBookData();
      }
    );
  };

  render() {
    return (
      <>
        <div className="container-fluid">
          <ToastContainer
            ref={ref => (this.container = ref)}
            className="toast-top-right"
          />
          <div className="row btncontainer">
            <a href="/bookActions/0" className="btn btn-primary pull-right">
              Add Book
              <i className="fa fa-chevron-right ml10" />
            </a>
          </div>
          {this.state.books.length > 0 && (
            <HomeTable
              books={this.state.books}
              removeAction={this.removeBookInfo}
            />
          )}
        </div>
      </>
    );
  }
}
