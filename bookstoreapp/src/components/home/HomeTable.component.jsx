import React from 'react';
import HomeTableRow from './HomeTableRow.component';

const HomeTable = ({ books,removeAction }) => {
  return (
    <div className="row">
      <table className="table table-condensed table-striped table-bordered books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <HomeTableRow book={book} removeAction={removeAction} key={book.id}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;
