import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();
const rootElement = document.getElementById('root');

ReactDOM.render(
    (
    <Provider store={store}>
        <App />
    </Provider>
    ),
    rootElement);
serviceWorker.unregister();
