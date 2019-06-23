import { ajax } from 'jquery';

const InvokeHttp = (config, callBack) => {
  ajax({ ...config })
    .then(response => {
      //this callback function will do any custom processing
      callBack(response);
    })
    .catch(err => {
      console.log(
        `ajax failure status ${err.status} status text: ${err.statusText}`
      );
    });
};

export { InvokeHttp };
