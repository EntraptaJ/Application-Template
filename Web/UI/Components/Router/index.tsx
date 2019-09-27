// Web/UI/Components/Router/index.tsx
// UI/UI/Components/Router/index.tsx
import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from './Route';
import { AppRoute } from './AppRoute';
import { AppRoutes } from './AppRoutes';

function generateRoutes(routes: AppRoute[], parent: string = '/'): React.ReactElement[] {
  const elements: React.ReactElement[] = [];
  for (const { path, children, ...route } of routes) {
    const routePath = `${parent}${path}`
    if (children) elements.push(<Route key={route.to} path={routePath} {...route}>{generateRoutes(children, routePath)}</Route>)
    else elements.push(<Route key={route.to} path={routePath} {...route} />);
  }
  return elements;
}

function AppRouter(): ReactElement {
  return <Switch>{...generateRoutes(AppRoutes)}</Switch>;
}

export default AppRouter;
