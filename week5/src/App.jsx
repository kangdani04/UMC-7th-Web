import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
import GenrePage from './pages/genre.jsx';
import ProfilePage from './pages/profile.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// QueryClient 생성
const queryClient = new QueryClient();

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
            element: <MoviesPage url='/movie/popular?language=ko-KR' />,
          },
          {
            path: 'now-playing',
            element: <MoviesPage url='/movie/now_playing?language=ko-KR' />,
          },
          {
            path: 'top-rated',
            element: <MoviesPage url='/movie/top_rated?language=ko-KR' />,
          },
          {
            path: 'up-coming',
            element: <MoviesPage url='/movie/upcoming?language=ko-KR' />,
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
      {
        path: 'genres',
        element: <GenrePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />, 
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      {/* QueryClientProvider로 앱을 감싸기 */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
