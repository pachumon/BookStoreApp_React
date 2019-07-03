import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import BookDetailsRow from './BookDetailsRow.component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookInfoActions from '../../actions/bookInfoActions';

class BookDetails extends Component {
  state = { bookInfo: {} };

  componentDidMount = () => {
    const bookId = get(this.props, 'match.params.bookId');
    this.props.actions.clearStaleBookInfoData();
    this.props.actions.loadBookInfoAsync(bookId);
  };

  render() {
    const { bookInfo } = this.props;    
    return (
      <div className="container-fluid">
        {(get(bookInfo.data, 'id') != undefined && get(bookInfo.data, 'id') != 0) && (
          <div className="row">
            <div className="panel panel-primary">
              <div className="panel-heading">
                Book Details&nbsp;:&nbsp;{bookInfo.data.title}
              </div>
              <div className="panel-body">
                <BookDetailsRow label="Title" content={bookInfo.data.title} />
                <BookDetailsRow label="Author" content={bookInfo.data.author} />
                <BookDetailsRow
                  label="Published"
                  content={bookInfo.data.published}
                />
                <BookDetailsRow
                  label="Category"
                  content={bookInfo.data.category}
                />
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

const mapStateToProps = (state) => {
  return { bookInfo: state.bookInfo };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(bookInfoActions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetails);
