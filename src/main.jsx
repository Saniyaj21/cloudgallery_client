import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {Provider} from 'react-redux';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

// in local setup use this 
// export const base_url = 'http://localhost:8080'


// in production code push this 
export const base_url = 'https://cloudgallery-sani.onrender.com/'

