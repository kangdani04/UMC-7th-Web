import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 페이지 컴포넌트들 import
import HomePage from './pages/home.jsx';
import NotFound from './pages/not-found.jsx';
import MoviesPage from './pages/movies.jsx';
import CategoryPage from './pages/category.jsx';
import RootLayout from './layout/root-layout.jsx';
import SignupPage from './pages/signup.jsx';
import LoginPage from './pages/login.jsx';
import SearchPage from './pages/search.jsx';
import MoviesLayout from './layout/movies-layout.jsx';
import MovieDetailPage from './pages/movieDetail.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// 라우팅 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies',
        element: <MoviesLayout />,
        children: [
          {
            index: true,
            element: <CategoryPage />,
          },
          {
            path: 'popular',
            element: <MoviesPage url='/movie/popular?language=ko-KR&page=1' />,
          },
          {
            path: 'now-playing',
            element: <MoviesPage url='/movie/now_playing?language=ko-KR&page=1' />,
          },
          {
            path: 'top-rated',
            element: <MoviesPage url='/movie/top_rated?language=ko-KR&page=1' />,
          },
          {
            path: 'up-coming',
            element: <MoviesPage url='/movie/upcoming?language=ko-KR&page=1' />,
          },
          {
            path: ':movieId',
            element: <MovieDetailPage />,
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
            <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
