import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StrictMode } from "react";
import ProgressBar from './ProgressBar.js'



ReactDOM.render(
  <StrictMode>
  <App />
</StrictMode>
 , document.getElementById('root'));

ReactDOM.render(
  <StrictMode>
    <ProgressBar />
</StrictMode>
, document.getElementById('bar'));

