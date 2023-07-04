import { RouteProps } from 'react-router-dom';
import { AddEmployee, HomePage } from '../../pages';

export type AppRoutesProps = RouteProps

export enum AppRoutes {
  MAIN = 'main',
  ADD_EMPLOYEE = 'add_employee'
}
export const RoutesConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: '/',
    element: <HomePage />,
  },
  [AppRoutes.ADD_EMPLOYEE]: {
    path: '/add_employee',
    element: <AddEmployee />,
  },
};
