import AddPhone from "../pages/Admin/productManagement/AddPhone";
import DeletePhone from "../pages/Admin/productManagement/DeletePhone";
import AllPhone from "../pages/Manager/Allphone";
import ManagerDashboard from "../pages/Manager/ManagerDashboard";


export const ManagerPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <ManagerDashboard />,
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
      }
    ]
  }
];
