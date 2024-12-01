import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store/store';  // store 임포트
import { Provider } from 'react-redux';  // Provider 임포트

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>  {/* Redux store를 Provider로 감싸기 */}
    <App />
  </Provider>
);
