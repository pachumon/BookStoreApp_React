import React, { Component, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { InvokeHttp } from '../../httpUtils/AjaxGateway';
import { get } from 'lodash';
import BookDetailsRow from './BookDetailsRow.component';
import DataLoader from '../common/DataLoader.component';

const LoadBookDetails = (SetBookInfo, SetLoading, bookId) => {
  InvokeHttp(
    { method: 'GET', url: `http://localhost:3600/books/${bookId}` },
    response => {
      SetBookInfo({ ...response });
      SetLoading(false);
    }
  );
};

const useBookdetailsComponentHandler = props => {
  const [BookInfo, SetBookInfo] = useState({});
  const [Loading, SetLoading] = useState('true');

  useEffect(() => {
    const bookId = get(props, 'match.params.bookId');
    LoadBookDetails(SetBookInfo, SetLoading, bookId);
  }, []);
  return { BookInfo, Loading };
};

const BookDetails = props => {
  const { BookInfo, Loading } = useBookdetailsComponentHandler(props);

  return (
    <div className="container-fluid">
      <DataLoader isLoading={Loading}>
        {dataLoaderProps => {
          if (get(BookInfo, 'title') != undefined) {
            return (
              <div className="row">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    Book Details&nbsp;:&nbsp;{BookInfo.title}
                  </div>
                  <div className="panel-body">
                    <BookDetailsRow label="Title" content={BookInfo.title} />
                    <BookDetailsRow label="Author" content={BookInfo.author} />
                    <BookDetailsRow
                      label="Published"
                      content={BookInfo.published}
                    />
                    <BookDetailsRow
                      label="Category"
                      content={BookInfo.category}
                    />
                  </div>
                </div>
              </div>
            );
          }
        }}
      </DataLoader>
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
