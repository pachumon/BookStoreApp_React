import React, { Component, useState, useEffect, useRef } from 'react';
import HomeTable from './HomeTable.component';
import { InvokeHttp } from '../../httpUtils/AjaxGateway';
import { ToastContainer } from 'react-toastr';
import { curry } from 'lodash';

const loadBookData = SetBooks => {
  InvokeHttp({ method: 'GET', url: `http://localhost:3600/books` }, response =>
    SetBooks([...response])
  );
};
//this function is curried to avoid passing container & SetBooks reference down the hierarchy
const removeBookInfo = curry((container, SetBooks, bookID) => {
  InvokeHttp(
    {
      method: 'DELETE',
      url: `http://localhost:3600/books/${bookID}`
    },
    response => {
      loadBookData(SetBooks);
      container.current.success(`Book has been Removed`, ``, {
        closeButton: true
      });
    }
  );
});

const useHomeComponentHandler = () => {
  const [Books, SetBooks] = useState([]);
  useEffect(() => {
    loadBookData(SetBooks);
  }, []);
  return { Books, SetBooks };
};

const Home = () => {
  const container = useRef(null);
  const { Books, SetBooks } = useHomeComponentHandler();

  return (
    <>
      {console.log(Books.length)}
      <div className="container-fluid">
        <ToastContainer ref={container} className="toast-top-right" />
        <div className="row btncontainer">
          <a href="/bookActions/0" className="btn btn-primary pull-right">
            Add Book
            <i className="fa fa-chevron-right ml10" />
          </a>
        </div>
        {Books.length > 0 && (
          <HomeTable
            books={Books}
            removeAction={removeBookInfo(container, SetBooks)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
