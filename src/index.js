import 'core-js/stable';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { JournalApp } from './JournalApp';
import './styles/styles.scss';

ReactDOM.render(
  <JournalApp />,
  document.getElementById('root')
);
