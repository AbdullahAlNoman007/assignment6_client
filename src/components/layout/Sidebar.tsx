import { Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { verifyToken } from '../../utils/verifyToken';
import { useAppSelector } from '../../redux/hook';
import { useCurrentToken } from '../../redux/features/auth/authSlicer';
import { Tuser } from '../../types/program.type';
import { ManagerPaths } from '../../routes/manager.routes';
import { sellerPaths } from '../../routes/seller.routes';

const { Sider } = Layout;

const userRole = {
  SUPERADMIN: 'superAdmin',
  MANAGER: 'manager',
  SELLER: 'seller',
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token) as Tuser
  }

  let sidebarItems: any;

  switch (user!.role) {
    case userRole.SUPERADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.SUPERADMIN);
      break;
    case userRole.MANAGER:
      sidebarItems = sidebarItemsGenerator(ManagerPaths, userRole.MANAGER);
      break;
    case userRole.SELLER:
      sidebarItems = sidebarItemsGenerator(sellerPaths, userRole.SELLER);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
    >
      <div
        style={{
          color: 'white',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Smart-Phone</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
