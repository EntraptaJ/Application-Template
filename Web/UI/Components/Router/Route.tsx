// Web/UI/Components/Router/Route.tsx
import React, { PropsWithChildren } from 'react';
import { Route as RouteComponent } from 'react-router-dom';
import { useImport } from '../Providers/ImportProvider';

export interface ImportedRouteInput {
  imported: Promise<{ default: any }>;
  path: string;
}

interface RouteProps {
  imported?: ImportedRouteInput;
  path: string;
  exact?: boolean;
}

const Loading: React.FunctionComponent<> = () => {
  return <div>Loading</div>;
};

Loading.displayName = 'Loading';

export function Route({
  imported,
  children,
  path,
  exact = false,
}: PropsWithChildren<RouteProps>): React.ReactElement {
  const Component = useImport({
    ...imported,
    Loader: Loading,
  });

  return <RouteComponent exact={exact} path={path} component={Component} />;
}
