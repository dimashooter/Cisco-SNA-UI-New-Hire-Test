import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, RoutesConfig } from '../../shared/routeConfig/routeConfig';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback="loading...">{route.element}</Suspense>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(RoutesConfig).map(renderWithWrapper)}</Routes>;
});

AppRouter.displayName = 'AppRouter';
