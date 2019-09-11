import React, { Component, useState, useEffect, useRef } from 'react';
import HomeTable from './HomeTable.component';
import { InvokeHttp } from '../../httpUtils/AjaxGateway';
import { ToastContainer } from 'react-toastr';
import { curry } from 'lodash';
import DataLoader from '../common/DataLoader.component';

const loadBookData = (SetBooks, SetLoading) => {
  InvokeHttp(
    { method: 'GET', url: `http://localhost:3600/books` },
    response => {
      SetBooks([...response]);
      SetLoading(false);
    }
  );
};
//this function is curried to avoid passing container & SetBooks reference down the hierarchy
const removeBookInfo = curry((container, SetBooks, SetLoading, bookID) => {
  InvokeHttp(
    {
      method: 'DELETE',
      url: `http://localhost:3600/books/${bookID}`
    },
    response => {      
      loadBookData(SetBooks,SetLoading);
      container.current.success(`Book has been Removed`, ``, {
        closeButton: true
      });
    }
  );
});

const useHomeComponentHandler = () => {
  const [Books, SetBooks] = useState([]);
  const [Loading, SetLoading] = useState(true);

  useEffect(() => {
    loadBookData(SetBooks, SetLoading);
  }, []);
  return { Books, SetBooks, Loading, SetLoading };
};

const Home = () => {
  const container = useRef(null);
  const { Books, SetBooks, Loading, SetLoading } = useHomeComponentHandler();

  return (
    <>
      <div className="container-fluid">
        <ToastContainer ref={container} className="toast-top-right" />
        <div className="row btncontainer">
          <a href="/bookActions/0" className="btn btn-primary pull-right">
            Add Book
            <i className="fa fa-chevron-right ml10" />
          </a>
        </div>
        <DataLoader isLoading={Loading}>
          {dataLoaderProps => {
            if (Books.length > 0) {
              return (
                <HomeTable
                  books={Books}
                  removeAction={removeBookInfo(container, SetBooks, SetLoading)}
                />
              );
            }
          }}
        </DataLoader>
      </div>
    </>
  );
};

export default Home;
