import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

function RootLayout() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <hr />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}