import React, { Component, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { InvokeHttp } from '../../httpUtils/AjaxGateway';
import { Formik, ErrorMessage } from 'formik';
import { ToastContainer } from 'react-toastr';
import * as Yup from 'yup';
import DataLoader from '../common/DataLoader.component';

const defaultValue = {
  id: 0,
  title: '',
  author: '',
  published: 2019,
  category: ''
};

const handleFormSubmit = (bookInfo, setSubmitting, container) => {
  let { id, ...postData } = bookInfo;
  if (id === 0) {
    //adding new book
    InvokeHttp(
      {
        method: 'POST',
        url: `http://localhost:3600/books`,
        data: postData
      },
      () => {
        setSubmitting(false);
        container.current.success(`Book has been Created`, ``, {
          closeButton: true
        });
      }
    );
  } else {
    //update existing book
    InvokeHttp(
      {
        method: 'PUT',
        url: `http://localhost:3600/books/${id}`,
        data: postData
      },
      () => {
        setSubmitting(false);
        container.current.success(`Book has been Updated`, ``, {
          closeButton: true
        });
      }
    );
  }
};

const useBookActionsHandler = props => {
  const [defaultState, setDefaultState] = useState(defaultValue);
  const [bookInfo, setBookInfo] = useState(defaultState);
  const [Loading, SetLoading] = useState('true');
  useEffect(() => {
    const bookId = get(props, 'match.params.bookId');
    if (bookId !== '0') {
      InvokeHttp(
        {
          method: 'GET',
          url: `http://localhost:3600/books/${bookId}`
        },
        response => {
          console.log(response);
          setDefaultState({ ...response });
          SetLoading(false);
          setBookInfo({ ...response });
        }
      );
    }
    else{
      SetLoading(false);
    }
  }, []);

  return { defaultState, bookInfo, Loading };
};

const BookActions = props => {
  const container = useRef(null);
  const { defaultState, bookInfo, Loading } = useBookActionsHandler(props);

  return (
    <div className="container-fluid">
      <ToastContainer ref={container} className="toast-top-right" />
      <DataLoader isLoading={Loading}>
        {dataLoaderProps => {
          if (get(bookInfo, 'title') != undefined) {
            return (
              <div className="row">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    {bookInfo.id === 0
                      ? 'Add New Book'
                      : 'Editing Book : ' + bookInfo.title}
                  </div>
                  <div className="panel-body">
                    <Formik
                      initialValues={bookInfo}
                      enableReinitialize={true}
                      validationSchema={Yup.object({
                        title: Yup.string().required('title is required'),
                        author: Yup.string().required('author is required'),
                        published: Yup.string().required(
                          'published is required'
                        ),
                        category: Yup.string().required('category is required')
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        handleFormSubmit(values, setSubmitting, container);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        handleSubmit,
                        resetForm
                      }) => (
                        <>
                          <form
                            className="form-horizontal"
                            onSubmit={handleSubmit}
                          >
                            <div
                              className={`form-group ${errors.title !==
                                undefined &&
                                touched.title !== undefined &&
                                'has-error'}`}
                            >
                              <label
                                htmlFor="title"
                                className="col-sm-2 control-label"
                              >
                                Title :
                              </label>
                              <div>
                                <div className="col-sm-6">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <div className="col-sm-4">
                                  <ErrorMessage name="title">
                                    {msg => (
                                      <span
                                        className="alert alert-danger"
                                        style={{ padding: '5px' }}
                                      >
                                        <span>{msg}</span>
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`form-group ${errors.author !==
                                undefined &&
                                touched.author !== undefined &&
                                'has-error'}`}
                            >
                              <label
                                htmlFor="author"
                                className="col-sm-2 control-label"
                              >
                                Author :
                              </label>
                              <div>
                                <div className="col-sm-6">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="author"
                                    value={values.author}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <div className="col-sm-4">
                                  <ErrorMessage name="author">
                                    {msg => (
                                      <span
                                        className="alert alert-danger"
                                        style={{ padding: '5px' }}
                                      >
                                        <span>{msg}</span>
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`form-group ${errors.published !==
                                undefined &&
                                touched.published !== undefined &&
                                'has-error'}`}
                            >
                              <label
                                htmlFor="published"
                                className="col-sm-2 control-label"
                              >
                                Published :
                              </label>
                              <div>
                                <div className="col-sm-6">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="published"
                                    value={values.published}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <div className="col-sm-4">
                                  <ErrorMessage name="published">
                                    {msg => (
                                      <span
                                        className="alert alert-danger"
                                        style={{ padding: '5px' }}
                                      >
                                        <span>{msg}</span>
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`form-group ${errors.category !==
                                undefined &&
                                touched.category !== undefined &&
                                'has-error'}`}
                            >
                              <label
                                htmlFor="category"
                                className="col-sm-2 control-label"
                              >
                                Category :
                              </label>
                              <div>
                                <div className="col-sm-6">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <div className="col-sm-4">
                                  <ErrorMessage name="category">
                                    {msg => (
                                      <span
                                        className="alert alert-danger"
                                        style={{ padding: '5px' }}
                                      >
                                        <span>{msg}</span>
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="col-sm-offset-3 col-sm-10">
                                <input
                                  type="submit"
                                  className="btn btn-primary"
                                  value="Submit"
                                  disabled={isSubmitting}
                                />
                                <a
                                  className="col-sm-offset-1 btn btn-primary"
                                  onClick={() => {
                                    resetForm(defaultState);
                                  }}
                                >
                                  Reset
                                </a>
                              </div>
                            </div>
                          </form>
                        </>
                      )}
                    </Formik>
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

export default BookActions;
