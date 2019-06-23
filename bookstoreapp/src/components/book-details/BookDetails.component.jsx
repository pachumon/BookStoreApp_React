import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { InvokeHttp } from '../../httpUtils/AjaxGateway';
import { get } from 'lodash';
import BookDetailsRow from './BookDetailsRow.component';

class BookDetails extends Component {
  state = { bookInfo: {} };
  componentDidMount = () => {
    const bookId = get(this.props, 'match.params.bookId');
    InvokeHttp(
      { method: 'GET', url: `http://localhost:3600/books/${bookId}` },
      (response) => {
        this.setState({ bookInfo: { ...response } });
      }
    );
  };

  render() {
    const { bookInfo } = this.state;
    return (
      <div className="container-fluid">
        {get(bookInfo, 'title') != undefined && (
          <div className="row">
            <div className="panel panel-primary">
              <div className="panel-heading">
                Book Details&nbsp;:&nbsp;{bookInfo.title}
              </div>
              <div className="panel-body">
                <BookDetailsRow label="Title" content={bookInfo.title} />
                <BookDetailsRow label="Author" content={bookInfo.author} />
                <BookDetailsRow
                  label="Published"
                  content={bookInfo.published}
                />
                <BookDetailsRow label="Category" content={bookInfo.category} />
              </div>
            </div>
          </div>
        )}
        <div className="row btncontainer">
          <Link to="/" className="btn btn-primary pull-right">
            <i className="fa fa-chevron-left mr10" />
            Back
          </Link>
        </div>
      </div>
    );
  }
}

export default BookDetails;
