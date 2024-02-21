import AdminDashboard from "../pages/Admin/AdminDashboard";
import AddPhone from "../pages/Admin/productManagement/AddPhone";
import AllPhone from "../pages/Admin/productManagement/AllPhone";
import DeletePhone from "../pages/Admin/productManagement/DeletePhone";
import PhoneFiltering from "../pages/Admin/productManagement/PhoneFiltering";
import SaleHistory from "../pages/Admin/productManagement/SaleHistory";
import AllManager from "../pages/Admin/userManagement/AllManager";
import AllSeller from "../pages/Admin/userManagement/AllSeller";
import AllSuperAdmin from "../pages/Admin/userManagement/AllSuperAdmin";
import CreateManager from "../pages/Admin/userManagement/CreateManager";
import CreateSeller from "../pages/Admin/userManagement/CreateSeller";
import CreateSuperAdmin from "../pages/Admin/userManagement/CreateSuperAdmin";


export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Create Super Admin',
        path: 'create-super-admin',
        element: <CreateSuperAdmin />,
      },
      {
        name: 'Super Admins',
        path: 'super-admin-data',
        element: <AllSuperAdmin />,
      },
      {
        name: 'Create Manager',
        path: 'create-manager',
        element: <CreateManager />,
      },
      {
        name: 'Managers',
        path: 'manager-data',
        element: <AllManager />,
      },
      {
        name: 'Create Seller',
        path: 'create-seller',
        element: <CreateSeller />,
      },
      {
        name: 'Seller',
        path: 'sellers-data',
        element: <AllSeller />,
      }
    ],
  },
  {
    name: "Product Management",
    children: [
      {
        name: "Add Phone",
        path: "add-phone",
        element: <AddPhone />
      },
      {
        name: "All Phone",
        path: "all-phone",
        element: <AllPhone />
      },
      {
        name: "Delete Phone",
        path: "delete-phone",
        element: <DeletePhone />
      },
      {
        name: "Phone Filtering",
        path: "phone-filtering",
        element: <PhoneFiltering />
      },
      {
        name: "Sale History",
        path: "sale-history",
        element: <SaleHistory />
      }
    ]
  }
];