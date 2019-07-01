import { ajax } from 'jquery';

const InvokeHttp = (config, successCallBack,errCallBack) => {  
  
  ajax({ ...config })
    .then(response => {
      //this callback function will do any custom processing
      successCallBack(response);
    })
    .catch((err,b,c) => {      
      console.log(
        `ajax failure status ${err.status} status text: ${err.statusText}`
      );
      errCallBack();
    });
};

export { InvokeHttp };
