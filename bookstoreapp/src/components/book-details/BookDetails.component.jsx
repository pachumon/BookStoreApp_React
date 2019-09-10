import React, { Component, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { InvokeHttp } from '../../httpUtils/AjaxGateway';
import { get } from 'lodash';
import BookDetailsRow from './BookDetailsRow.component';

const LoadBookDetails = (SetBookInfo, bookId) => {
  InvokeHttp(
    { method: 'GET', url: `http://localhost:3600/books/${bookId}` },
    response => {
      SetBookInfo({ ...response });
    }
  );
};

const useBookdetailsComponentHandler = (props) => {
  const [BookInfo, SetBookInfo] = useState({});
  useEffect(() => {
    const bookId = get(props, 'match.params.bookId');
    LoadBookDetails(SetBookInfo, bookId);
  }, []);
  return { BookInfo };
};

const BookDetails = props => {
  const { BookInfo } = useBookdetailsComponentHandler(props);  
  
  return (
    <div className="container-fluid">
      {get(BookInfo, 'title') != undefined && (
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-heading">
              Book Details&nbsp;:&nbsp;{BookInfo.title}
            </div>
            <div className="panel-body">
              <BookDetailsRow label="Title" content={BookInfo.title} />
              <BookDetailsRow label="Author" content={BookInfo.author} />
              <BookDetailsRow label="Published" content={BookInfo.published} />
              <BookDetailsRow label="Category" content={BookInfo.category} />
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
};

export default BookDetails;
