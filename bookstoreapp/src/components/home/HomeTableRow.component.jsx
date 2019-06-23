import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

const HomeTableRow = ({ book,removeAction }) => {
  return (
    <tr>
      <td>
        <Link to={`/bookDetails/${book.id}`} className="tableAction">
          {book.title}
        </Link>
      </td>
      <td>{book.author}</td>
      <td>{book.published}</td>
      <td>
        <Link to={`/bookActions/${book.id}`} className="mr15 tableAction">
          Edit
        </Link>
        <a className="tableAction" onClick={()=>removeAction(book.id)}>Remove</a>
      </td>
    </tr>
  );
};

export default HomeTableRow;
