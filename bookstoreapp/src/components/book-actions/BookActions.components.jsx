import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { InvokeHttp } from '../../httpUtils/AjaxGateway';
import { Formik, ErrorMessage } from 'formik';
import { ToastContainer } from 'react-toastr';
import { defaultBookInfo } from '../../reducers/defaultStateContainer';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookInfoActions from '../../actions/bookInfoActions';

class BookActions extends Component {
  container;

  handleFormSubmit = (bookInfo, setSubmitting) => {
    let { id, ...postData } = bookInfo;
    let { actions } = this.props;
    if (id === 0) {
      actions.handleBookInfoCreate(bookInfo, setSubmitting, this.container);
    } else {
      actions.handleBookInfoEdit(bookInfo, setSubmitting, this.container);
    }
  };

  componentDidMount = () => {
    let { actions } = this.props;
    const bookId = get(this.props, 'match.params.bookId');
    actions.clearStaleBookInfoData();

    if (bookId !== '0') {
      actions.loadBookInfoAsync(bookId);
    }
  };

  render() {
    console.log(this.props.actions);
    const { bookInfo } = this.props;
    return (
      <div className="container-fluid">
        <ToastContainer
          ref={ref => (this.container = ref)}
          className="toast-top-right"
        />
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-heading">
              {bookInfo.data.id === 0
                ? 'Add New Book'
                : 'Editing Book : ' + bookInfo.data.title}
            </div>
            <div className="panel-body">
              {bookInfo.data.id !== undefined && (
                <Formik
                  initialValues={bookInfo.data}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    title: Yup.string().required('title is required'),
                    author: Yup.string().required('author is required'),
                    published: Yup.string().required('published is required'),
                    category: Yup.string().required('category is required')
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    this.handleFormSubmit(values, setSubmitting);
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
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <div
                          className={`form-group ${errors.title !== undefined &&
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
                              onClick={() => resetForm(this.defaultState)}
                            >
                              Reset
                            </a>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
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

const mapStateToProps = state => {
  console.log(state.bookInfo);
  return { bookInfo: state.bookInfo };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(bookInfoActions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookActions);
