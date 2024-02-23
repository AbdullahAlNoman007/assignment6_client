import InVoice from "../pages/InVoice";
import AllPhone from "../pages/Seller/AllPhone";
import SellerDashboard from "../pages/Seller/SellerDashboard";


export const sellerPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <SellerDashboard />,
  },
  {
    name: 'All Phone',
    path: 'all-phone',
    element: <AllPhone />,
  },
  {
    path: "invoice",
    element: <InVoice />
  },
];
