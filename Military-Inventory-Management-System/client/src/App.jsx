import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "./pages/Login";
import Home from "./pages/Home"
import AdminHome from "./pages/administrator/Home"
import Adminnavbar from "./pages/administrator/Adminnavbar";
import BattalionNavbar from "./pages/battalion/BattalionNavbar";
import ManagerNavbar from "./pages/manager/ManagerNavbar";
import SupplierNavbar from "./pages/supplier/SupplierNavbar";
import BattalionHome from "./pages/battalion/BattalionHome";
import SupplierHome from "./pages/supplier/Home";
import ManagerHome from "./pages/manager/Home";
import Allocateresource from "./pages/administrator/Allocateresource";
import Productentry from "./pages/manager/Productentry";
import Viewreport from "./pages/administrator/Viewreport";
import Signup from "./pages/manager/Generatelogincred";
import Requestresource from "./pages/battalion/Requestresource";
import OrderEquipment from "./pages/manager/OrderEquipment";
import Viewallocation from "./pages/battalion/Viewallocation";
import Vieworder from "./pages/supplier/Vieworder";
import Enterprice from "./pages/supplier/Enterprice";
import GenerateReport from "./pages/manager/GenerateReport";
import ViewReport from "./pages/ViewReport";
import SupplierEntry from "./pages/manager/SupplierEntry";
import BattalionEntry from "./pages/manager/BattalionEntry";
import ProductList from "./pages/manager/ProductView";
import SupplierList from "./pages/manager/SupplierView";
import BattalionList from "./pages/manager/BattalionView";

function AdminLayout(){
  return(
    <div>
      <Adminnavbar/>
      <Outlet/>
    </div>
  )
}

function BattalionLayout(){
  return(
    <div>
      <BattalionNavbar/>
      <Outlet/>
    </div>
  )
}

function SupplierLayout(){
  return(
    <div>
      <SupplierNavbar/>
      <Outlet/>
    </div>
  )
}

function ManagerLayout(){
  return(
    <div>
      <ManagerNavbar/>
      <Outlet/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path : "/",
    element : <Home/>,
  },
  {
    path : "/login",
    element : <LoginPage/>
  },
  {
    path : "/manager",
    element : <ManagerLayout/>,
    children : [
      {
        path : "/manager",
        element : <ManagerHome/>
      },
      {
        path : "/manager/productentry",
        element : <Productentry/>
      },
      {
        path : "/manager/battalionentry",
        element : <BattalionEntry/>
      },
      {
        path : "/manager/supplierentry",
        element : <SupplierEntry/>
      },
      {
        path : "/manager/signup",
        element : <Signup/>
      },
      {
        path : "/manager/order",
        element : <OrderEquipment/>
      },
      {
        path : "/manager/generateReport",
        element : <GenerateReport/>
      },
      {
        path : "/manager/viewreport",
        element : <ViewReport/>
      },
      {
        path : "/manager/viewbattalion",
        element : <BattalionList/>
      },
      {
        path : "/manager/viewsupplier",
        element : <SupplierList/>
      },
      {
        path : "/manager/viewproducts",
        element : <ProductList/>
      },
    ]
  },
  {
    path : "/supplier",
    element : <SupplierLayout/>,
    children:[
      {
        path : "/supplier",
        element : <SupplierHome/>
      },
      {
        path : "/supplier/orders",
        element : <Vieworder/>
      },
      {
        path : "/supplier/enterprice",
        element : <Enterprice/>
      }
    ]
  },
  {
    path : "/battalion",
    element : <BattalionLayout/>,
    children : [
      {
        path : "/battalion",
        element : <BattalionHome/>
      },
      {
        path : "/battalion/order",
        element : <Requestresource/>
      },
      {
        path : "/battalion/viewallocation",
        element : <Viewallocation/>
      },
    ]
  },
  {
    path : "/admin",
    element : <AdminLayout/>,
    children:[
      {
        path:"/admin",
        element : <AdminHome/>
      },
      {
        path : "/admin/allocate",
        element : <Allocateresource/>
      },
      {
        path : "/admin/viewreport",
        element : <Viewreport/>
      }
    ]
  },  
  

])

function App(){
  return(
    <div className="app" >
      <RouterProvider router={router}/>
    </div>
  )
}

export default App