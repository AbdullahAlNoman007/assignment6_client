import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/verifyToken';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { logout, useCurrentToken } from '../../redux/features/auth/authSlicer';
import { Tuser } from '../../types/program.type';

type TprotectRoute = {
  children: ReactNode;
  role: string | undefined;
}

const ProtectedRoute = ({ children, role }: TprotectRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user;
  const dispatch = useAppDispatch()

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (token) {
    user = verifyToken(token) as Tuser
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout())
    return <Navigate to="/login" replace={true} />;
  }



  return children;
};

export default ProtectedRoute;
