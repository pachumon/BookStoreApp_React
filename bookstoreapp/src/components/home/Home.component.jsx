import React, { Component } from 'react';
import HomeTable from './HomeTable.component';
import { InvokeHttp } from '../../httpUtils/AjaxGateway';
import { ToastContainer } from 'react-toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookActions from '../../actions/booksActions';

class Home extends Component {
  container;

  componentDidMount() {    
    this.props.actions.loadBooks();
  } 

  removeBookInfo = bookID => {
    this.props.actions.removeBookInfo(bookID,this.container);
  };

  render() {
    const { books } = this.props;
    //console.log(bookActions);
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
          {books.data.length > 0 && (
            <HomeTable books={books.data} removeAction={this.removeBookInfo} />
          )}
          {books.errorInfo !== '' && (
            <div className="row text-center bold">{books.errorInfo}</div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {  
  return { books: state.books };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(bookActions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
