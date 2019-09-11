import React, { Component } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const spinnerStyle = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

export default class DataLoader extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div className="text-center">
          <ScaleLoader
            css={spinnerStyle}
            sizeUnit={'px'}
            size={50}
            color={'#3eb8b8'}
            loading={this.props.isLoading}
          />
        </div>
      );
    } else {
      return <div>{this.props.children(this.props)}</div>;
    }
  }
}
