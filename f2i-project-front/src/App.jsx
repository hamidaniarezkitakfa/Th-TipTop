import "./App.css";
import { Outlet, createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { lazy, Suspense } from 'react';
import Navbar from "./components/nav";
import Footer from "./components/footer";
import Home from "./Pages/home/Home";
import Blog from "./Pages/blog/Blog";
import Participer from "./Pages/participer/participer";
import HeroSection from './components/hero';
import Contact from "./Pages/contact/contact";
import { AuthProvider } from './services/authContex';
import Auth from "./Pages/authPage/auth";
import ProtectedRoute from './ProtectedRoute';
import CookieConsentPopup from './components/CookieConsentPopup';
import UserProfile from './components/userProfil'
import Gain from './components/gain'
import About from "./Pages/aboutPage/aboutPage";
import MontionLégales from "./Pages/MontionLégales/mentionsLégales";
import ConditionGénérale from "./Pages/conditionGénérale/conditionsGénérales";
import PolitiqueDeConfid from "./Pages/politiquesDeConfidentialité/politiquesDeConfidentialité";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './fonts.css'

//admin 
import DashboardLayout from './layouts/dashboard';
import ProtecteAdmindRoute from './ProtectedAdminRoute.jsx';

export const IndexPage = lazy(() => import('./Pages/appAdmin.jsx'));
export const BlogPage = lazy(() => import('./Pages/blogAdmin'));
export const UserPage = lazy(() => import('./Pages/userAdmin'));
export const JeuxPage = lazy(() => import('./Pages/jeux'));
export const CreateJeux = lazy(() => import('./Pages/createJeux'));
export const CreatePage = lazy(() => import('./Pages/createUser'));
export const TicketPage = lazy(() => import('./Pages/ticket'));
export const ProductsPage = lazy(() => import('./Pages/products'));
export const Page404 = lazy(() => import('./Pages/page-not-found'));
export const LoginPage = lazy(() => import('./Pages/login'));
export const CreateTicket = lazy(() => import('./Pages/createTicket.jsx'));
import './fonts.css'
import ThemeProvider from './theme';

function App() {
  const Layout = () => {
    return (
      <>
      <HeroSection />
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: "home", element: <Home /> },
        { path: "signup", element: <Auth /> },
        {path: "blog", element: <Blog />},
        {path: "about", element: <About />},
        {path: "contact", element: <Contact />},
        {path: "montionLégales", element: <MontionLégales />},
        {path: "conditionGénerale", element: <ConditionGénérale />},
        {path: "politiqueDeConfidentialité", element: <PolitiqueDeConfid />},
        {path: "participer", element: <ProtectedRoute> <Participer /> </ProtectedRoute>},
        {path: "user", element:<ProtectedRoute>  <UserProfile /> </ProtectedRoute>},
        {path: "gain", element:<ProtectedRoute> <Gain /> </ProtectedRoute>}
      ],
    },

    {
      path: "/admin",
      element: (
        <ThemeProvider>
          <ProtecteAdmindRoute>
            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </ProtecteAdmindRoute>
        </ThemeProvider>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        // { path: 'products', element: <ProductsPage /> },
        { path: 'jeux', element: <JeuxPage /> },
        { path: 'jeux/create', element: <CreateJeux /> },
        // { path: 'blog', element: <BlogPage /> },
        { path: 'ticket', element: <TicketPage /> },
        { path: 'user/create', element: <CreatePage /> },
        { path: 'ticket/create', element: <CreateTicket /> },
      ],
    },
    {
      path: '/admin/login',
      element: <LoginPage />,
    },

  ]);
  return (
    <>
      <div className="App">
        <AuthProvider>
          <CookieConsentPopup />
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
