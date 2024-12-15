import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 페이지 컴포넌트들 import
import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import MoviesPage from "./pages/movies";
import CategoryPage from "./pages/category";
import RootLayout from "./layout/root-layout";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import SearchPage from "./pages/search";
import MoviesLayout from "./layout/movies-layout";
import MovieDetailPage from "./pages/movieDetail";
import GenrePage from "./pages/genre";
import ProfilePage from "./pages/profile";
import { AuthProvider } from "./context/AuthContext";

// QueryClient 생성
const queryClient = new QueryClient();

// 라우팅 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies",
        element: <MoviesLayout />,
        children: [
          {
            index: true,
            element: <CategoryPage />,
          },
          {
            path: "popular",
            element: <MoviesPage url="/movie/popular?language=ko-KR" />,
          },
          {
            path: "now-playing",
            element: <MoviesPage url="/movie/now_playing?language=ko-KR" />,
          },
          {
            path: "top-rated",
            element: <MoviesPage url="/movie/top_rated?language=ko-KR" />,
          },
          {
            path: "up-coming",
            element: <MoviesPage url="/movie/upcoming?language=ko-KR" />,
          },
          {
            path: ":movieId",
            element: <MovieDetailPage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "genres",
        element: <GenrePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <AuthProvider>
      {/* QueryClientProvider로 앱을 감싸기 */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
