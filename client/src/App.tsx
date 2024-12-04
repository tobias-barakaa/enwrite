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
import AdminDashboard from './admin/pages/AdminDashboard';


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
  ]
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
      ]
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
    }
   
    
  ]
},
{
  path: 'admin',
  element: <LoginAdmin />,
  children: [
    {
      index: true,
      element: <AdminDashboard />
    },
    {
      path: 'admin-dashboard',
      element: <AdminDashboard />
    }
  ]
}

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
