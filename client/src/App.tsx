import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './components/MainLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import DashboardMain from './dashboard/components/DashboardMain';
import PrivateRoute from './utils/PrivateRoute';
import HomeDashboard from './dashboard/pages/dashboard/HomeDashboard';
import Hire from './dashboard/pages/hire/Hire';
import ContentOrder from './dashboard/pages/hire/ContentOrder';
import OrderContent from './dashboard/pages/hire/OrderContent';
import Manage from './dashboard/pages/manage/Manage';
import Payments from './dashboard/pages/payments/Payments';
import InvoiceComponent from './dashboard/pages/payments/invoice/Invoice';
import PaymentMethod from './dashboard/pages/payments/invoice/PaymentMethod';
import WorkRoom from './dashboard/pages/manage/WorkRoom';
import MyOrders from './dashboard/pages/manage/MyOrders';
import { ToastContainer } from 'react-toastify';
import LoginAdmin from './admin/pages/LoginAdmin';
import OrderDetailsAdmin from './admin/pages/order/OrderDetailsAdmin';
import Orders from './admin/pages/order/Orders';
import AdminHeader from './admin/pages/AdminHeader';
import HomeAdmin from './admin/pages/HomeAdmin';
import Completed from './dashboard/pages/completed/Completed';
import PasswordReset from './pages/PasswordReset';
import TokenExpired from './components/TokenExpired';
import ForgotPassword from './pages/ForgotPassword';
import BlogPost from './components/BlogPost';
import Faq from './dashboard/components/Faq';


const router = createBrowserRouter([
  {
  path: "",
  element: <MainLayout />,  
  children: [
    {
      index: true,  
      element: <HomePage />,
    },
    {
      path: "get-started",  
      element: <Register />,
    },
    {
      path: "login",  
      element: <Login />,
    },
    {
      path: "blog",
      element: <BlogPost />
    },
    {
      path: "faq",
      element: <Faq />
    }
  ]
},
{
  path: "/password-reset",
  element: <PasswordReset />
},
{
  path: "/forgot-password/:id/:token",
  element: <ForgotPassword />
},
{
  path: "/forgot-password/token-expired",
  element: <TokenExpired />
},

{
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardMain />
      </PrivateRoute>
  ),
  children: [
    {
      index: true,
      element: <HomeDashboard />
    },
    {
      path: "Hire",
      element: <Hire />,
      children: [
        {
          index: true, 
          element: <OrderContent />,
        },
        {
          path: ":id",
          element: <ContentOrder />
        },
       
      ],
    },

    {
      path: "Manage",
      element: <Manage />,
      children: [
        
        { 
          index: true,
          element: <WorkRoom />,
        },
        { 
          path: 'my-orders',
          element: <MyOrders />,
        },
        {
        }
      ],
      
    },

    {
      path: "Payments",
      element: <Payments />,
      children: [
        {
          index: true,
          element: <InvoiceComponent />,
        },
        {
          path: "payment-methods",
          element: <PaymentMethod />,
        },
        {
        }
      ]
    },
    {
      path: "Completed",
      element: <Completed />
    }
   
    
  ]
},
{
  path: 'admin',
  element: <LoginAdmin />,

},
{
  path: 'admin/dashboard',
  element: <AdminHeader />,
  
  children: [
    {
      index: true,
      element: <HomeAdmin />
    },
    
    {
      path: ':id',
      element: <OrderDetailsAdmin />
    },
    {
      path: 'orders',
      element: <Orders />
    }

    
  ]
},


])

function App() {

  return (
    <>
        <ToastContainer />

      <RouterProvider router={router} />
    </>
  )
}

export default App
