// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import '../index.css';
// import App from '../components/app/app';
// import reportWebVitals from '../reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
