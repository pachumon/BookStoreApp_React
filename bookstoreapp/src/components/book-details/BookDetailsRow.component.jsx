import React from 'react';

const BookDetailsRow = ({ label, content }) => {
  return (
    <div className="form-group">
      <label className="col-sm-2 control-label">{label}</label>
      <div className="col-sm-10">
        <label className="control-label">
          :&nbsp;&nbsp;&nbsp;&nbsp;{content}
        </label>
      </div>
    </div>
  );
};

export default BookDetailsRow;
