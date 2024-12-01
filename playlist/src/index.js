import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import { store } from './store/store';  // store 임포트
import { Provider } from 'react-redux';  // Provider 임포트

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>  {/* Redux store를 Provider로 감싸기 */}
        <App />
    </Provider>
);
