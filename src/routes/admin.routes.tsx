import AdminDashboard from "../pages/Admin/AdminDashboard";
import AddPhone from "../pages/Admin/productManagement/AddPhone";
import AllPhone from "../pages/Admin/productManagement/AllPhone";
import DeletePhone from "../pages/Admin/productManagement/DeletePhone";
import SaleHistory from "../pages/Admin/productManagement/SaleHistory";
import AllManager from "../pages/Admin/userManagement/AllManager";
import AllSeller from "../pages/Admin/userManagement/AllSeller";
import AllSuperAdmin from "../pages/Admin/userManagement/AllSuperAdmin";
import CreateManager from "../pages/Admin/userManagement/CreateManager";
import CreateSeller from "../pages/Admin/userManagement/CreateSeller";
import CreateSuperAdmin from "../pages/Admin/userManagement/CreateSuperAdmin";
import CreateVariant from "../pages/CreateVariant";
import UpdatePhone from "../pages/UpdatePhone";


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
        path: "update-phone/:id",
        element: <UpdatePhone />
      },
      {
        path: "create-variant/:id",
        element: <CreateVariant />
      },
      {
        name: "Delete Phone",
        path: "delete-phone",
        element: <DeletePhone />
      },
      {
        name: "Sale History",
        path: "sale-history",
        element: <SaleHistory />
      }
    ]
  }
];