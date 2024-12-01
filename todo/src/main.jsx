import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoContextProvider } from './context/TodoContext.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';  // react-redux Provider 임포트
import store from './app/store.js';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>  {/* Redux Provider 추가 */}
            <TodoContextProvider>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </TodoContextProvider>
        </Provider>
    </QueryClientProvider>
);
